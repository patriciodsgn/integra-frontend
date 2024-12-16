import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, from, mergeMap, of, catchError, reduce, map } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import { Region } from '../models/region-data.model';
import { WS_ADM_SOLService } from './WS_ADM_SOL.service';

export interface Jardin {
  codReg: string;
  region: string;
  codCom: string;
  comuna: string;
  jardin: string;
  nombreJardin: string;
  estado: string;
  codMod: string;
  modalidad: string;
  ubicacion: string;
  latitud: string;
  longitud: string;
  calle: string;
  rbd: string;
  fono_1: string;
  correo: string;
  director: string;
  cjor: string;
  jor: string;
  cniv: string;
  niv: string;
  gru: string;
  cap: string;
}

export interface RegionStats {
  totalJardines: number;
  modalidades: { [key: string]: number };
  comunas: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = `${environmentdb.apidb}/regiones/tbRegion`;
  private apiUrlIntegra = `${environmentdb.apidb}/regiones/tbRegionIntegra`;
  
  private selectedRegionSubject = new BehaviorSubject<number | null>(null);
  selectedRegion$ = this.selectedRegionSubject.asObservable();

  private jardinesSubject = new BehaviorSubject<Jardin[]>([]);
  jardines$ = this.jardinesSubject.asObservable();

  private regionStatsSubject = new BehaviorSubject<{ [key: string]: RegionStats }>({});
  regionStats$ = this.regionStatsSubject.asObservable();

  // Progress tracking
  private progressSubject = new BehaviorSubject<{[key: number]: number}>({});
  progress$ = this.progressSubject.asObservable();

  private regionNames: { [key: number]: string } = {
    1: 'Tarapacá',
    2: 'Antofagasta',
    3: 'Atacama',
    4: 'Coquimbo',
    5: 'Valparaíso',
    6: 'Región Metropolitana',
    601: 'RM - Nor Oriente',
    602: 'RM - Nor Poniente',
    603: 'RM - Sur Oriente',
    7: 'O\'Higgins',
    8: 'Maule',
    9: 'Biobío',
    10: 'Araucanía',
    11: 'Los Lagos',
    12: 'Aysén',
    13: 'Magallanes',
    14: 'Los Ríos',
    15: 'Arica y Parinacota',
    16: 'Ñuble'
  };

  constructor(
    private http: HttpClient,
    private wsAdmSolService: WS_ADM_SOLService
  ) {}

  // Métodos básicos de Region
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl);
  }

  getRegionsIntegra(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrlIntegra);
  }

  getAllRegionsData(): Observable<{ regular: Region[], integra: Region[] }> {
    return forkJoin({
      regular: this.getRegions(),
      integra: this.getRegionsIntegra()
    });
  }

  setRegion(regionId: number) {
    this.selectedRegionSubject.next(regionId);
    this.loadRegionData(regionId);
  }

// Método paralelo para obtener todos los datos con paginación interna

fetchAllRegionDataLimitedParallel(limit: number): void {
  const startTime = performance.now();
  console.group('🚀 [fetchAllRegionDataLimitedParallel]');
  console.log('Configuración inicial:', {
    límite: limit,
    tiempoInicio: new Date().toISOString()
  });

  const regions = Array.from({ length: 17 }, (_, i) => i + 1);
  console.log('📋 Regiones a procesar:', regions);

  // Función para procesar una región con paginación
  const fetchRegionData = (region: number, offset: string = '', accumulated: Jardin[] = []): Observable<Jardin[]> => {
    console.group(`📍 [Región ${region}] Iniciando petición`);
    console.log('Estado actual:', {
      acumulados: accumulated.length,
      offset: offset || 'inicial',
      región: region
    });

    return this.wsAdmSolService.getData(region.toString(), offset).pipe(
      mergeMap(response => {
        console.group(`📥 [Región ${region}] Procesando respuesta`);
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response, 'text/xml');
  
          console.log('Respuesta XML recibida:', {
            tipo: 'Object',
            tamaño: response.length
          });
  
          // Extraer y procesar datos
          const soloutElement = xmlDoc.getElementsByTagName('SOLOUT')[0];
          if (!soloutElement?.textContent) {
            throw new Error(`No se encontraron datos para región ${region}`);
          }
  
          const jsonData = JSON.parse(soloutElement.textContent);
          console.log(`[Región ${region}] Datos JSON parseados:`, {
            hayDatos: Boolean(jsonData),
            tipoData: "object"
          });
  
          const newJardines = this.processJardinesData(jsonData);
          console.log(`[Región ${region}] Jardines procesados:`, {
            muestra: newJardines.slice(0, 2).map(j => ({
              codReg: j.codReg,
              region: j.region,
              codCom: j.codCom,
              comuna: j.comuna,
              jardin: j.jardin
            })),
            length: newJardines.length,
            nuevos: newJardines.length
          });
  
          const updatedAccumulated = [...accumulated, ...newJardines];
  
          // Verificar paginación
          const solmasElement = xmlDoc.getElementsByTagName('SOLMAS')[0];
          const nextOffset = solmasElement?.textContent?.trim() || '';
  
          if (nextOffset) {
            console.log(`[Región ${region}] Siguiente página disponible:`, {
              offset: nextOffset
            });
            console.groupEnd();
            return fetchRegionData(region, nextOffset, updatedAccumulated);
          }
  
          console.log(`[Región ${region}] Procesamiento completado`, {
            totalJardines: updatedAccumulated.length
          });
          console.groupEnd();
          return of(updatedAccumulated);
  
        } catch (error) {
          console.error(`[Región ${region}] Error en procesamiento:`, error);
          console.groupEnd();
          return of(accumulated);
        }
      }),
      catchError(error => {
        console.error(`[Región ${region}] Error en servicio:`, error);
        console.groupEnd();
        return of(accumulated);
      })
    );
  };

  // Procesar regiones en paralelo
  from(regions).pipe(
    mergeMap(region => {
      console.log(`🎯 Iniciando procesamiento región ${region}`);
      return fetchRegionData(region);
    }, limit),
    reduce((acc: Jardin[], current: Jardin[]) => {
      console.log('🔄 Acumulando resultados:', {
        previos: acc.length,
        nuevos: current.length
      });
      return [...acc, ...current];
    }, [] as Jardin[])
  ).subscribe({
    next: (finalData) => {
      const endTime = performance.now();
      console.group('✅ Procesamiento completado');
      console.log('Resultados finales:', {
        totalJardines: finalData.length,
        tiempoTotal: `${(endTime - startTime).toFixed(2)}ms`,
        muestraFinal: finalData.slice(0, 3)
      });
      
      this.jardinesSubject.next(finalData);
      console.log('🔄 BehaviorSubject actualizado');
      
      this.updateAllRegionStats(finalData);
      console.log('📊 Estadísticas actualizadas');
      console.groupEnd();
    },
    error: (error) => {
      console.group('❌ Error fatal en proceso');
      console.error('Detalles del error:', error);
      this.jardinesSubject.next([]);
      console.log('⚠️ BehaviorSubject limpiado por error');
      console.groupEnd();
    }
  });
  
  console.groupEnd();
}

  

  // Métodos para estadísticas y datos detallados
  getRegionStats(regionId: string): Observable<RegionStats> {
    return this.jardines$.pipe(
      map(jardines => {
        const regionJardines = jardines.filter(j => j.codReg === regionId);
        
        const modalidades = regionJardines.reduce((acc, jardin) => {
          const modalidad = jardin.modalidad || 'Sin Modalidad';
          acc[modalidad] = (acc[modalidad] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        const comunas = regionJardines.reduce((acc, jardin) => {
          acc[jardin.comuna] = (acc[jardin.comuna] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        return {
          totalJardines: regionJardines.length,
          modalidades,
          comunas
        };
      })
    );
  }

  // Método para procesar datos de jardines
  private processJardinesData(data: any[]): Jardin[] {
    const dataArray = Array.isArray(data) ? data : [data];
    return dataArray.map(item => ({
      codReg: item.CodReg || '',
      region: item.Region || '',
      codCom: item.CodCom || '',
      comuna: item.Comuna || '',
      jardin: item.Jardin || '',
      nombreJardin: item.Nombre_Jardin || '',
      estado: item.Estado || '',
      codMod: item.CodMod || '',
      modalidad: item.Modalidad || '',
      ubicacion: item.Ubicacion || '',
      latitud: item.Latitud || '',
      longitud: item.Longitud || '',
      calle: item.Calle || '',
      rbd: item.RBD || '',
      fono_1: item.Fono_1 || '',
      correo: item.Correo || '',
      director: item.Director || '',
      ...this.processJorNiv(item.Jor_Niv?.[0])
    }));
  }

  private processJorNiv(jorNiv: any): any {
    if (!jorNiv) return {};
    return {
      cjor: jorNiv.Cjor || '',
      jor: jorNiv.Jor || '',
      cniv: jorNiv.Cniv || '',
      niv: jorNiv.Niv || '',
      gru: jorNiv.Gru || '',
      cap: jorNiv.Cap || ''
    };
  }

  // Métodos para actualizar estadísticas
  private updateAllRegionStats(jardines: Jardin[]): void {
    const stats: { [key: string]: RegionStats } = {};
    
    jardines.forEach(jardin => {
      if (!stats[jardin.codReg]) {
        stats[jardin.codReg] = {
          totalJardines: 0,
          modalidades: {},
          comunas: {}
        };
      }
      
      const regionStats = stats[jardin.codReg];
      regionStats.totalJardines++;
      
      const modalidad = jardin.modalidad || 'Sin Modalidad';
      regionStats.modalidades[modalidad] = (regionStats.modalidades[modalidad] || 0) + 1;
      
      regionStats.comunas[jardin.comuna] = (regionStats.comunas[jardin.comuna] || 0) + 1;
    });

    this.regionStatsSubject.next(stats);
  }

  // Método para cargar datos de una región específica
  private loadRegionData(regionId: number): void {
    this.wsAdmSolService.getData(regionId.toString(), '')
      .subscribe({
        next: (response) => {
          try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, 'text/xml');
            const soloutElement = xmlDoc.getElementsByTagName('SOLOUT')[0];
            
            if (soloutElement?.textContent) {
              const jsonData = JSON.parse(soloutElement.textContent);
              const jardines = this.processJardinesData(jsonData);
              this.jardinesSubject.next(jardines);
              this.updateRegionStats(regionId.toString(), jardines);
            }
          } catch (error) {
            console.error('Error procesando datos de la región:', error);
          }
        },
        error: (error) => {
          console.error('Error obteniendo datos de la región:', error);
        }
      });
  }

  private updateRegionStats(regionId: string, jardines: Jardin[]): void {
    const currentStats = this.regionStatsSubject.getValue();
    const regionJardines = jardines.filter(j => j.codReg === regionId);
    
    currentStats[regionId] = {
      totalJardines: regionJardines.length,
      modalidades: this.countModalidades(regionJardines),
      comunas: this.countComunas(regionJardines)
    };

    this.regionStatsSubject.next(currentStats);
  }

  private countModalidades(jardines: Jardin[]): { [key: string]: number } {
    return jardines.reduce((acc, jardin) => {
      const modalidad = jardin.modalidad || 'Sin Modalidad';
      acc[modalidad] = (acc[modalidad] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  private countComunas(jardines: Jardin[]): { [key: string]: number } {
    return jardines.reduce((acc, jardin) => {
      acc[jardin.comuna] = (acc[jardin.comuna] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  // Métodos de utilidad
  getRegionNameById(regionId: number): string {
    return this.regionNames[regionId] || 'Región Desconocida';
  }

  getAllRegionNames(): { [key: number]: string } {
    return { ...this.regionNames };
  }

  // Obtener el progreso actual de la carga
  getProgress(): Observable<{[key: number]: number}> {
    return this.progress$;
  }
}