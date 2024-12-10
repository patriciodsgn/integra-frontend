import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import MapModule from 'highcharts/modules/map';
import * as mapDataCL from '@highcharts/map-collection/countries/cl/cl-all.geo.json';
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
    // Suscribirse al observable de jardines
    this.subscription = this.regionService.jardines$
      .pipe(
        filter(jardines => jardines && jardines.length > 0)
      )
      .subscribe({
        next: (jardines) => {
          console.log(`Datos actualizados: ${jardines.length} jardines`);
          this.jardinesData = jardines;
          this.initializeMap();
        },
        error: (error) => {
          console.error('Error en la suscripción:', error);
          this.loading = false;
        }
      });

    // Iniciar la carga de datos
    this.regionService.fetchAllRegionDataLimitedParallel(17);
  }

  private initializeMap(): void {
    if (!this.mapContainer || !this.mapContainer.nativeElement) {
      console.warn('Container del mapa no encontrado');
      return;
    }
  
    if (Highcharts.charts[0]) {
      console.log('Destruyendo carta existente');
      Highcharts.charts[0].destroy();
    }
  
    const data = mapDataCL.features.map((feature: any) => {
      const codReg = this.normalizeRegionCode(feature.properties['hc-key']);
      const jardinesEnRegion = this.jardinesData.filter(j => 
        this.normalizeRegionCode(j.codReg) === codReg
      );
      const count = jardinesEnRegion.length;
  
      return {
        'hc-key': feature.properties['hc-key'],
        'name': feature.properties['name'],
        'value': count,
        'jardines': jardinesEnRegion,
        'iconUrl': '../../../assets/images/barcos.png', // Ruta relativa a la imagen
        properties: {
          ...feature.properties,
          totalJardines: count
        }
      };
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
            console.log('Mapa cargado completamente');
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
          enabled: false,
          format: '{point.name}'
        },
        allAreas: true,
        data: data,
        joinBy: ['hc-key', 'hc-key'],
        point: {
          events: {
            click: (e: any) => {
              const point = e.point;
              const regionCode = this.getRegionCode(point.properties['hc-key']);
              if (regionCode) {
                console.log(`Click en región: ${point.name}`);
                this.regionService.setRegion(Number(regionCode));
                this.router.navigate([`/region/${regionCode}`]);
              }
            }
          }
        }
      }]
    };
  
    this.chart = Highcharts.mapChart(this.mapContainer.nativeElement, this.chartOptions);
  }



  private normalizeRegionCode(code: string): string {
    if (!code) return '';
    const normalized = code.trim().toLowerCase();
  
    // Mapeo bidireccional de códigos
    const codeMap: { [key: string]: string } = {
      // Códigos numéricos a cl-
      '15': 'cl-ap',
      '1': 'cl-ta',
      '2': 'cl-an',
      '3': 'cl-at',
      '4': 'cl-co',
      '5': 'cl-vs',
      '6': 'cl-rm',
      '7': 'cl-li',
      '8': 'cl-ml',
      '16': 'cl-nb',
      '9': 'cl-bi',
      '10': 'cl-ar',
      '14': 'cl-lr',
      '11': 'cl-ll',
      '12': 'cl-ai',
      '13': 'cl-ma',
  
      // Mapeo de códigos especiales
      'cl-2730': 'cl-ar',  // La Araucanía
      'cl-2740': 'cl-ap',  // Arica y Parinacota
      
      // Códigos directos
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
      'cl-ma': 'cl-ma'
    };
  
    //console.log(`Normalizando código: ${code} -> ${codeMap[normalized] || normalized}`);
    return codeMap[normalized] || normalized;
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