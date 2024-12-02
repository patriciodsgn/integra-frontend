import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment, environmentp } from '../../../environments/environment';
import { Jardin, Nino, PuebloOriginarioStats, RegionStats, EstadisticasTotales } from '../models/models';
import * as jardinesData from '../../../assets/tbJardin.json';
import * as ninosData from '../../../assets/tbPONino.json';
import { DataSourceService } from '../../core/services/data-source.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private mockData = {
        jardines: (jardinesData as any).tbJardin as Jardin[],
        ninos: (ninosData as any).tbPONino as Nino[]
    };

    private readonly COLORES: { [key: string]: string } = {
        'Mapuche': '#1E90FF',
        'Aymará': '#4B0082',
        'Diaguita': '#FF4500',
        'Colla': '#FF6347',
        'Quechua': '#8a2be2'
    };

    constructor(
        private http: HttpClient,
        private dataSource: DataSourceService
    ) {}

    executeQuery(query: string, params: any = {}): Observable<any[]> {
        if (environment.useMockData) {
            return of(this.executeMockQuery(query, params));
        }
        
        try {
            let httpParams = new HttpParams()
                .set('sql', query);
            
            Object.keys(params).forEach(key => {
                httpParams = httpParams.set(key, params[key]);
            });

            return this.http.get<any[]>(`${environmentp.apiurl}/query`, { params: httpParams });
        } catch (error) {
            console.error('Error en executeQuery:', error);
            return of([]);
        }
    }

    // Método para obtener estadísticas totales PO por región
    getEstadisticasTotalesPO(region: number): Observable<EstadisticasTotales> {
        const query = `
            SELECT 
                COUNT(*) AS totalNinos,
                COUNT(CASE WHEN n.GrupoOriginariooIndigena != 'No Pertenece' THEN 1 END) AS ninosOriginarios,
                CAST(
                    COUNT(CASE WHEN n.GrupoOriginariooIndigena != 'No Pertenece' THEN 1 END) * 100.0 / COUNT(*) 
                    AS DECIMAL(10,1)
                ) AS porcentaje
            FROM tbPONino n
            JOIN tbJardin j ON n.CodigoJardin = j.CodigoJardin
            WHERE (:region = 0 OR j.CodigoRegion = :region);
        `;
        console.log("Region Recibida", region);
        return this.executeQuery(query, { region }).pipe(
            map(results => {
                console.log("Resultado ", results);
                if (results && results.length > 0) {
                    const result = results[0];
                    return {
                        totalNinos: result.totalNinos,
                        ninosOriginarios: result.ninosOriginarios,
                        porcentaje: result.porcentaje
                    } as EstadisticasTotales;
                }
                // Retornar valores por defecto si no hay resultados
                return {
                    totalNinos: 0,
                    ninosOriginarios: 0,
                    porcentaje: 0
                } as EstadisticasTotales;
            })
        );
    }

    getEstadisticasRegion(region: number): Observable<RegionStats[]> {
        return this.getEstadisticasPorRegion(region);
    }

    getEstadisticasPorRegion(region: number): Observable<RegionStats[]> {
        const query = `
            SELECT 
                j.Comuna, 
                n.GrupoOriginariooIndigena as pueblo, 
                COUNT(*) as cantidad
            FROM tbPONino n
            JOIN tbJardin j ON n.CodigoJardin = j.CodigoJardin
            WHERE j.CodigoRegion = :region
            AND n.GrupoOriginariooIndigena != 'No Pertenece'
            GROUP BY j.Comuna, n.GrupoOriginariooIndigena
            ORDER BY j.Comuna, n.GrupoOriginariooIndigena
        `;
    
        return this.executeQuery(query, { region }).pipe(
            
            map(results => {
                // Procesar los resultados para asegurar que todas las comunas tengan todos los pueblos
                const comunasMap = new Map<string, {[pueblo: string]: number}>();
                
                // Inicializar todas las comunas con todos los pueblos en 0
                results.forEach(row => {
                    if (!comunasMap.has(row.Comuna)) {
                        comunasMap.set(row.Comuna, {
                            'Atacameño': 0,
                            'Aymará': 0,
                            'Colla': 0,
                            'Diaguita': 0,
                            'Mapuche': 0,
                            'Quechua': 0,
                            'Rapa Nui': 0
                        });
                    }
                    const stats = comunasMap.get(row.Comuna)!;
                    if (row.pueblo in stats) {
                        stats[row.pueblo] = row.cantidad;
                    }
                });
    
                return Array.from(comunasMap.entries()).map(([comuna, stats]) => ({
                    comuna,
                    stats
                }));
            })
        );
    }

    getPueblosOriginarios(): Observable<PuebloOriginarioStats[]> {
        const query = `
            SELECT 
                GrupoOriginariooIndigena as nombre,
                COUNT(*) as cantidad,
                CAST(COUNT(*) * 100.0 / (
                    SELECT COUNT(*) 
                    FROM tbPONino 
                    WHERE GrupoOriginariooIndigena != 'No Pertenece'
                ) as DECIMAL(10,2)) as porcentaje
            FROM tbPONino
            WHERE GrupoOriginariooIndigena != 'No Pertenece'
            GROUP BY GrupoOriginariooIndigena
            ORDER BY COUNT(*) DESC
        `;

        return this.executeQuery(query).pipe(
            map(results => 
                results.map(r => ({
                    ...r,
                    color: this.COLORES[r.nombre] || '#808080'
                }))
            )
        );
    }

    private executeMockQuery(query: string, params: any): any[] {
        const normalizedQuery = query.toLowerCase();
        console.log('Normalized query:', normalizedQuery);
        
        if (normalizedQuery.includes('group by grupooriginariooindigena')) {
            console.log('Getting pueblos originarios summary');
            return this.getPueblosOriginariosMock();
        }
        
        if (normalizedQuery.includes('where codigoregion =')) {
            console.log('Getting region data for region:', params.region);
            return this.getRegionData(params.region) as Nino[];
        }

        if (normalizedQuery.includes('count(*) as totalninos')) {
            console.log('Getting total PO statistics for region:', params.region);
            return this.getEstadisticasTotalesPOMock(params.region);
        }

        console.log('No matching mock query found');
        return [];
    }

    private getPueblosOriginariosMock(): PuebloOriginarioStats[] {
        const pueblos = new Map<string, number>();
        const total = this.mockData.ninos.length;
    
        this.mockData.ninos.forEach(nino => {
            const pueblo = nino.GrupoOriginariooIndigena.trim();
            if (pueblo !== 'No Pertenece' && this.COLORES.hasOwnProperty(pueblo)) {
                pueblos.set(pueblo, (pueblos.get(pueblo) || 0) + 1);
            }
        });
    
        return Array.from(pueblos.entries()).map(([nombre, cantidad]) => ({
            nombre,
            cantidad,
            porcentaje: (cantidad / total) * 100,
            color: this.COLORES[nombre]
        }));
    }

    private getEstadisticasTotalesPOMock(region: number): any[] {
        console.log('Calculating mock total PO statistics for region:', region);
        const ninosInRegion: Nino[] = region === 0 ? this.mockData.ninos : this.getRegionData(region) as Nino[];
        const totalNinos = ninosInRegion.length;
        const ninosOriginarios = ninosInRegion.filter((n: Nino) => n.GrupoOriginariooIndigena.trim() !== 'No Pertenece').length;
        const porcentaje = totalNinos > 0 ? (ninosOriginarios / totalNinos) * 100 : 0;

        return [{
            totalNinos,
            ninosOriginarios,
            porcentaje: parseFloat(porcentaje.toFixed(1))
        }];
    }

    private getRegionData(region: number): Nino[] {
        const jardinesRegion = this.mockData.jardines.filter(j => j.CodigoRegion === region);
        const comunas = new Map<string, {[pueblo: string]: number}>();
    
        const ninosInRegion: Nino[] = [];
        jardinesRegion.forEach(jardin => {
            if (!comunas.has(jardin.Comuna)) {
                comunas.set(jardin.Comuna, {
                    'Atacameño': 0,
                    'Aymará': 0,
                    'Colla': 0,
                    'Diaguita': 0,
                    'Mapuche': 0,
                    'Quechua': 0,
                    'Rapa Nui': 0
                });
            }
    
            const ninosJardin = this.mockData.ninos.filter(n => n.CodigoJardin === jardin.CodigoJardin);
            ninosInRegion.push(...ninosJardin);
            
            ninosJardin.forEach(nino => {
                const pueblo = nino.GrupoOriginariooIndigena.trim();
                if (pueblo !== 'No Pertenece' && pueblo in comunas.get(jardin.Comuna)!) {
                    comunas.get(jardin.Comuna)![pueblo]++;
                }
            });
        });
    
        return ninosInRegion;
    }

    private getColorForPueblo(pueblo: string): string {
        return this.COLORES[pueblo] || '#808080';
    }
}
