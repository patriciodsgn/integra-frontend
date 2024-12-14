import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import MapModule from 'highcharts/modules/map';
//import * as mapDataCL from '@highcharts/map-collection/countries/cl/cl-all.geo.json';
import mapDataCL from '../../../assets/map/cl-all.geo.json';


import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import HighchartsMore from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
import Highcharts3D from 'highcharts/highcharts-3d';
import { RegionService, Jardin } from '../../services/region.service';

// Inicialización de módulos Highcharts
MapModule(Highcharts);
HighchartsMore(Highcharts);
Exporting(Highcharts);
Highcharts3D(Highcharts);

@Component({
  selector: 'app-region-map',
  template: `
    <div *ngIf="loading" class="loading-overlay">
      <div class="loading-container">
        <div class="loading-content">
          <div class="paper-boat-container">
            <div class="paper-boat">
              <div class="boat-body"></div>
              <div class="boat-bottom"></div>
              <div class="wave"></div>
            </div>
          </div>

          <h2 class="loading-title">Cargando Mapa Nacional</h2>

          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-water"></div>
            </div>
          </div>

          <div class="counter-container">
            
          </div>
        </div>
      </div>
    </div>
    <div #mapContainer class="map-container"></div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(183, 228, 234, 0.95);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loading-container {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      width: 90%;
      max-width: 400px;
    }

    .paper-boat-container {
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
    }

    .paper-boat {
  position: relative;
  animation: floatBoat 6s ease-in-out infinite;
  transform-origin: center bottom;
}

.boat-body {
  width: 120px;
  height: 60px;
  background: #B7E4EA;
  /* Ajustado para que se parezca más a un barco de papel doblado */
  clip-path: polygon(
    0% 100%,    /* Esquina inferior izquierda */
    20% 85%,    /* Pliegue izquierdo */
    50% 0%,     /* Punta superior */
    80% 85%,    /* Pliegue derecho */
    100% 100%   /* Esquina inferior derecha */
  );
  position: relative;
}

.boat-bottom {
  width: 120px;
  height: 25px;
  background: #9DD5DB;
  /* Base del barco más suave */
  clip-path: polygon(
    0% 0%,      /* Izquierda superior */
    20% 0%,     /* Pliegue izquierdo */
    50% 100%,   /* Punta inferior */
    80% 0%,     /* Pliegue derecho */
    100% 0%     /* Derecha superior */
  );
  position: absolute;
  bottom: -12px;
}

.wave {
  position: absolute;
  bottom: -25px;
  left: -30px;
  right: -30px;
  height: 15px;
  background: linear-gradient(
    90deg, 
    transparent,
    rgba(183, 228, 234, 0.3) 25%,
    rgba(183, 228, 234, 0.5) 50%,
    rgba(183, 228, 234, 0.3) 75%,
    transparent
  );
  animation: wave 2s linear infinite;
}

    .loading-title {
      color: #2B5F65;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }

    .progress-container {
      height: 8px;
      background: #E3F2F6;
      border-radius: 4px;
      overflow: hidden;
      margin: 1.5rem 0;
    }

    .progress-bar {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, #B7E4EA, #2B5F65);
      animation: progress 2s ease-in-out infinite;
    }

    .counter-container {
      margin: 1rem 0;
      font-size: 1.1rem;
      color: #2B5F65;
      text-align: center;
    }

    @keyframes floatBoat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1); 
  }
  25% { 
    transform: translateY(-8px) rotate(-2deg) scale(1.02); 
  }
  75% { 
    transform: translateY(-8px) rotate(2deg) scale(0.98); 
  }
}

    @keyframes wave {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @keyframes progress {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0); }
    }
  `]
})
export class RegionMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @Input() jardinesData: Jardin[] = [];
  
  loading = true;
  private chart: Highcharts.MapChart | undefined;
  private chartOptions: Highcharts.Options = {};
  private subscription: Subscription | undefined;

  constructor(
    private router: Router,
    private regionService: RegionService
  ) {}

  ngOnInit(): void {
    //console.log('Iniciando carga de datos...');
    this.initializeDataLoading();
  }
  private initializeDataLoading(): void {
    console.group('🚀 [initializeDataLoading]');
    console.log('Estado inicial:', {
      hayJardinesData: Boolean(this.jardinesData),
      longitudJardinesData: this.jardinesData?.length || 0
    });
  
    this.subscription = this.regionService.jardines$
      .pipe(
        filter(jardines => {
          console.group('🔍 [Filter] Evaluación de datos');
          console.log('Datos recibidos:', {
            esArray: Array.isArray(jardines),
            tipo: typeof jardines,
            valor: jardines,
            cantidadJardines: jardines?.length || 0
          });
  
          // Verificar estructura de datos
          if (jardines && jardines.length > 0) {
            console.log('Muestra del primer jardín:', jardines[0]);
          }
  
          const tieneJardines = jardines && jardines.length > 0;
          console.log('¿Pasa el filtro?:', tieneJardines);
          console.groupEnd();
          return tieneJardines;
        })
      )
      .subscribe({
        next: (jardines) => {
          console.group('✅ [Subscribe] Datos recibidos');
          console.log('Cantidad de jardines:', jardines.length);
          if (jardines.length > 0) {
            console.log('Estructura del primer jardín:', {
              ...jardines[0],
              codReg: this.normalizeRegionCode(jardines[0].codReg)
            });
          }
          console.log('Estado antes de actualizar:', {
            jardinesDataActual: this.jardinesData.length
          });
          this.jardinesData = jardines;
          console.log('Estado después de actualizar:', {
            jardinesDataNuevo: this.jardinesData.length
          });
          console.groupEnd();
  
          this.initializeMap();
        },
        error: (error) => {
          console.group('❌ [Subscribe] Error detectado');
          console.error('Detalles del error:', {
            mensaje: error.message,
            error: error
          });
          console.groupEnd();
          this.loading = false;
        }
      });
  
    console.log('⚡ Iniciando carga de datos paralela...');
    try {
      this.regionService.fetchAllRegionDataLimitedParallel(17);
      console.log('✅ Solicitud de carga iniciada correctamente');
    } catch (error) {
      console.error('❌ Error al iniciar la carga:', error);
    }
    console.groupEnd();
  }

  private initializeMap(): void {
    console.group('🗺️ [initializeMap] Inicialización del mapa');
    
    // Debug inicial de datos de jardines
    console.log('Datos de jardines recibidos:', {
      total: this.jardinesData.length,
      muestra: this.jardinesData.map(j => ({
        codReg: j.codReg,
        normalizado: this.normalizeRegionCode(j.codReg)
      }))
    });
  
    if (!this.mapContainer || !this.mapContainer.nativeElement) {
      console.warn('⚠️ Container del mapa no encontrado');
      console.groupEnd();
      return;
    }
  
    if (Highcharts.charts[0]) {
      console.log('🔄 Destruyendo carta existente');
      Highcharts.charts[0].destroy();
    }
  
    const data = mapDataCL.features.map((feature: any) => {
      const hcKey = feature.properties['hc-key'];
      const codReg = this.normalizeRegionCode(hcKey);
      
    //  console.group(`Procesando región: ${feature.properties.name}`);
    //  console.log('Códigos de región:', {
    //    'hc-key': hcKey,
    //    'códigoNormalizado': codReg,
    //    'nombreRegión': feature.properties.name
    //  });
  
      const jardinesEnRegion = this.jardinesData.filter(jardin => {
        const jardinCodReg = this.normalizeRegionCode(jardin.codReg);
        const regionCode = this.normalizeRegionCode(hcKey);
        
        //console.log(`Comparando códigos para ${feature.properties.name}:`, {
       //   códigoJardín: jardin.codReg,
       //   jardínNormalizado: jardinCodReg,
       //   códigoRegión: hcKey,
       //   regiónNormalizada: regionCode,
       //   coincide: jardinCodReg === regionCode
       // });
        
        return jardinCodReg === regionCode;
      });
  
      //console.log('Resumen de la región:', {
     //   región: feature.properties.name,
     //   jardinesEncontrados: jardinesEnRegion.length,
     //   muestraJardines: jardinesEnRegion.slice(0, 2)
     // });
      console.groupEnd();
  
      return {
        'hc-key': feature.properties['hc-key'],
        name: feature.properties['name'],
        value: jardinesEnRegion.length,
        jardines: jardinesEnRegion,
        iconUrl: '../../../assets/images/barcos.png',
        properties: {
          ...feature.properties,
          totalJardines: jardinesEnRegion.length
        }
      };
    });
  
    console.log('📊 Resumen final de datos:', {
      regionesConDatos: data.filter(d => d.value > 0).length,
      regionesSinDatos: data.filter(d => d.value === 0).length,
      totalJardinesMapeados: data.reduce((acc, curr) => acc + curr.value, 0),
      resumenPorRegión: data.map(d => ({
        región: d.name,
        jardines: d.value,
        'hc-key': d['hc-key'],
        codigoRegion: this.normalizeRegionCode(d['hc-key']), // Agregamos el código normalizado
        codigoOriginal: d.properties?.['cod_region'] || 'No disponible', // Código original si está disponible
        resumen: `${d.name} (${this.normalizeRegionCode(d['hc-key'])}): ${d.value} jardines` // Resumen formateado
      }))
    });
  
    const maxValue = Math.max(...data.map(d => d.value));
  
    this.chartOptions = {
      credits: { enabled: false },
      chart: {
        map: mapDataCL,
        renderTo: this.mapContainer.nativeElement,
        height: '800px',
        backgroundColor: '#ffffff',
        style: { fontFamily: 'Arial, sans-serif' },
        events: {
          load: () => {
            console.log('✅ Mapa cargado completamente');
            this.loading = false;
          }
        }
      },
      title: {
        text: 'Mapa de Chile',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333'
        }
      },
      mapNavigation: {
        enabled: true,
        enableMouseWheelZoom: true,
        buttonOptions: {
          verticalAlign: 'bottom',
          style: { color: '#333' }
        }
      },
      tooltip: {
        useHTML: true,
        formatter: function() {
          return `
            <div style="
              padding: 12px; 
              background: #B7E4EA; 
              border-radius: 8px; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              min-width: 180px;
            ">
              <h4 style="
                margin: 0 0 8px 0; 
                color: #2B5F65; 
                font-weight: bold; 
                font-size: 14px;
              ">
                ${this.point.name}
              </h4>
              <div style="
                display: flex; 
                align-items: center; 
                gap: 8px;
                color: #2B5F65;
              ">
                <i class="fas fa-building" style="color: #2B5F65;"></i>
                <p style="
                  margin: 0; 
                  font-size: 13px;
                ">
                  <strong>Total Jardines:</strong> 
                  <span style="color: #2B5F65">${this.point.value}</span>
                </p>
              </div>
            </div>
          `;
        }
      },
      colorAxis: {
        min: 0,
        max: maxValue,
        minColor: '#E3F2FD',
        maxColor: '#1565C0',
        stops: [
          [0, '#E3F2FD'],
          [0.2, '#90CAF9'],
          [0.4, '#42A5F5'],
          [0.6, '#1E88E5'],
          [0.8, '#1565C0'],
          [1, '#0D47A1']
        ]
      },
      series: [{
        type: 'map',
        name: 'Jardines por Región',
        states: {
          hover: {
            color: '#4CAF50',
            brightness: 0.15
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.value}',
          style: {
            fontSize: '10px'
          }
        },
        allAreas: true,
        data: data,
        joinBy: ['hc-key', 'hc-key'],
        point: {
          events: {
            click: (e: any) => {
              const point = e.point;
              console.log('🖱️ Click en región:', {
                región: point.name,
                propiedades: point.properties,
                datos: point.jardines
              });
              const regionCode = this.getRegionCode(point.properties['hc-key']);
              if (regionCode) {
                this.regionService.setRegion(Number(regionCode));
                this.router.navigate([`/region/${regionCode}`]);
              }
            }
          }
        }
      }]
    };
  
    this.chart = Highcharts.mapChart(this.mapContainer.nativeElement, this.chartOptions);
    console.groupEnd();
  }



  private normalizeRegionCode(code: string): string {
    console.group('[normalizeRegionCode]');
    
    console.group('Entrada recibida:');
    console.log({
      código: code,
      esVacío: !code,
      longitudOriginal: code?.length,
      tipo: typeof code,
      '[[Prototype]]': 'Object'
    });
    console.groupEnd();
  
    if (!code) {
      console.groupEnd();
      return '';
    }
  
    const normalized = code.trim().toLowerCase();
    
    console.group('Código normalizado:');
    console.log({
      cambios: code !== normalized ? "Sí" : "No",
      normalizado: normalized,
      original: code,
      '[[Prototype]]': 'Object'
    });
    console.groupEnd();
  
    // Mapeo bidireccional de códigos
    const codeMap: { [key: string]: string } = {
      // Códigos numéricos según el servicio
      '15': 'cl-ap',  // Arica y Parinacota
      '1': 'cl-ta',   // Tarapacá
      '2': 'cl-an',   // Antofagasta
      '3': 'cl-at',   // Atacama
      '4': 'cl-co',   // Coquimbo
      '5': 'cl-vs',   // Valparaíso
      '6': 'cl-li',   // O'Higgins
      '7': 'cl-ml',   // Maule
      '8': 'cl-bi',   // Biobío
      '9': 'cl-ar',   // La Araucanía
      '10': 'cl-ll',  // Los Lagos
      '11': 'cl-ai',  // Aysén
      '12': 'cl-ma',  // Magallanes
      '13': 'cl-rm',  // Metropolitana (corregido)
      '14': 'cl-lr',  // Los Ríos
      '16': 'cl-nb',  // Ñuble
  
      // Mapeo de códigos especiales
      'cl-2730': 'cl-ar',  // La Araucanía
      'cl-2740': 'cl-ap',  // Arica y Parinacota
      'cl-lc': 'cl-rm',    // Las Condes -> Región Metropolitana
      'lc': 'cl-rm',       // Versión corta
      
      // Códigos directos con su equivalente
      'ml': 'cl-ml',
      'nb': 'cl-nb',
      'bi': 'cl-bi',
      'ar': 'cl-ar',
      'lr': 'cl-lr',
      'll': 'cl-ll',
      'ai': 'cl-ai',
      'ma': 'cl-ma',
      'ap': 'cl-ap',
      'ta': 'cl-ta',
      'an': 'cl-an',
      'at': 'cl-at',
      'co': 'cl-co',
      'vs': 'cl-vs',
      'rm': 'cl-rm',
      'li': 'cl-li',
      
      // Asegurar que códigos cl- existentes se mantengan
      'cl-ap': 'cl-ap',
      'cl-ta': 'cl-ta',
      'cl-an': 'cl-an',
      'cl-at': 'cl-at',
      'cl-co': 'cl-co',
      'cl-vs': 'cl-vs',
      'cl-rm': 'cl-rm',
      'cl-li': 'cl-li',
      'cl-ml': 'cl-ml',
      'cl-nb': 'cl-nb',
      'cl-bi': 'cl-bi',
      'cl-ar': 'cl-ar',
      'cl-lr': 'cl-lr',
      'cl-ll': 'cl-ll',
      'cl-ai': 'cl-ai',
      'cl-ma': 'cl-ma',
  
      // Mapeos inversos
      'clap': 'cl-ap',
      'clta': 'cl-ta',
      'clan': 'cl-an',
      'clat': 'cl-at',
      'clco': 'cl-co',
      'clvs': 'cl-vs',
      'clrm': 'cl-rm',
      'clli': 'cl-li',
      'clml': 'cl-ml',
      'clnb': 'cl-nb',
      'clbi': 'cl-bi',
      'clar': 'cl-ar',
      'cllr': 'cl-lr',
      'clll': 'cl-ll',
      'clai': 'cl-ai',
      'clma': 'cl-ma'
    };
  
    const result = codeMap[normalized] || normalized;
    
    console.group('Resultado del mapeo:');
    console.log({
      códigoNormalizado: normalized,
      encontradoEnMapa: normalized in codeMap,
      resultadoMapeo: result,
      usandoFallback: result === normalized,
      '[[Prototype]]': 'Object'
    });
    console.groupEnd();
  
    console.groupEnd();
    return result;
  }

  private getRegionCode(hcKey: string): string | null {
    const regionMap: { [key: string]: string } = {
      'cl-ap': '15',  // Arica y Parinacota
      'cl-ta': '1',   // Tarapacá
      'cl-an': '2',   // Antofagasta
      'cl-at': '3',   // Atacama
      'cl-co': '4',   // Coquimbo
      'cl-vs': '5',   // Valparaíso
      'cl-rm': '6',   // Región Metropolitana
      'cl-li': '7',   // O'Higgins
      'cl-ml': '8',   // Maule
      'cl-nb': '16',  // Ñuble
      'cl-bi': '9',   // Biobío
      'cl-ar': '10',  // Araucanía
      'cl-lr': '14',  // Los Ríos
      'cl-ll': '11',  // Los Lagos
      'cl-ai': '12',  // Aysén
      'cl-ma': '13',  // Magallanes
      
      // Mapeos adicionales para códigos especiales
      'cl-2730': '10', // La Araucanía
      'cl-2740': '15'  // Arica y Parinacota
    };
  
    const normalizedKey = this.normalizeRegionCode(hcKey);
    return regionMap[normalizedKey] || null;
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}