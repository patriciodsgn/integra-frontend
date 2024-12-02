import { Component, OnInit, OnDestroy,ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import ExportingModule from 'highcharts/modules/exporting';
import FullScreenModule from 'highcharts/modules/full-screen';
import { JardinesPorRegionYComuna } from 'src/app/services/shared-data.service';
import VariablePie from 'highcharts/modules/variable-pie';
import BellCurve from 'highcharts/modules/histogram-bellcurve';
import PatternFill from 'highcharts/modules/pattern-fill';
import PictorialModule from 'highcharts/modules/pictorial';
import ItemSeries from 'highcharts/modules/item-series';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import MapModule from 'highcharts/modules/map';
import { WsJarlisService } from 'src/app/services/ws-jarlis.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { MapColorsService } from 'src/app/services/map-colors.service';
import { DashboardStateService } from '../../core/services/dashboard-state.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { WS_ADM_SOLService } from 'src/app/services/WS_ADM_SOL.service';
MapModule(Highcharts);
export { Highcharts };
console.log('Módulo de mapas inicializado:', typeof Highcharts.mapChart === 'function');
// Interfaces para el tipado
type MapDataPoint = {
  'hc-key': string;
  name: string;
  value: number;
  color?: string;
};

type MapSeriesOptions = {
  type: 'map';
  data: MapDataPoint[];
  name: string;
  states?: {
    hover?: {
      color?: string;
    };
  };
  dataLabels?: {
    enabled?: boolean;
    format?: string;
  };
} & Highcharts.SeriesOptionsType;

type MapChartOptions = Omit<Highcharts.Options, 'series'> & {
  series: MapSeriesOptions[];
};

interface RegionData {
  [key: string]: Array<[string, number]>;
}
interface MapFeatureData {
  'hc-key': string;
  name: string;
  cantidadJardines: number;
  codigoComuna: string;
  value: number;
  color: string;
  properties: any;
}
interface ItemLista {
    tipo: 'comuna' | 'establecimiento';
    nombre: string;
    modalidad: string;
    codigo?: string;
    estado?: string;
    ubicacion?: string;
   
}
interface ItemColumna {
    texto: string;
    esComuna: boolean;
    prefijo?: string;
}
interface ComunaGroup {
    nombreComuna: string;
    establecimientos: Jardin[];
}
interface InfoAdicional {
    comuna: string;
    establecimientos: {
      tipo: string;
      nombre: string;
    }[];
  }
  

interface CustomPoint extends Highcharts.Point {
    name: string;
    value?: number;
    datos?: {
      calle: string;
      codCom: string;
      jardin: string;
      modalidad: string;
      ubicacion: string;
    };
    series: Highcharts.Series & {
      type: string;
    };
  }

  interface Jardin {
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

// Inicialización de módulos
function initializeHighcharts() {
  console.group('Inicialización de Highcharts');
  try {
    // Verificación inicial más segura
    console.log('Estado inicial:', {
      hasHighcharts: typeof Highcharts === 'object',
      hasMapModule: typeof MapModule === 'function',
      hasChart: typeof Highcharts?.Chart === 'function'
    });

    // Inicializar módulos
    MapModule(Highcharts);
    HighchartsMore(Highcharts);
    Highcharts3D(Highcharts);
    HighchartsSolidGauge(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);

    // Verificación post-inicialización
    const verificationResult = {
      hasMap: typeof (Highcharts as any).maps !== 'undefined',
      hasMapType: typeof (Highcharts as any).seriesTypes?.map !== 'undefined',
      availableModules: Object.keys(Highcharts).filter(key => 
        typeof (Highcharts as any)[key] === 'function'
      )
    };
    
    console.log('Estado después de inicialización:', verificationResult);

  } catch (error) {
    console.error('Error en la inicialización de Highcharts:', error);
    throw error;
  } finally {
    console.groupEnd();
  }
}

    ItemSeries(Highcharts);
    VariablePie(Highcharts);
    BellCurve(Highcharts);
    PatternFill(Highcharts);
    PictorialModule(Highcharts);
    

    initializeHighcharts();

@Component({
  selector: 'app-sello-verde-dashboard',
  templateUrl: './dppi-sello-verde-dashboard.component.html'
})
export class SelloVerdeDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private destroy$ = new Subject<void>();
  JardinesporRegion: Jardin[] = [];
  RegionSeleccionada: string = '';
  fechaActual: string = new Date().toLocaleDateString();
  chartOptions: any;
  private mapInitialized = false;
  private updatePending = false;
  private readonly debounceTime = 250; // ms
  private updateTimeout: any;
  informacionAdicional: InfoAdicional[] = [];
  private currentRegionId: number | null = null;
  //jardinesData: { [region: string]: { [comuna: string]: number } } = {};
  jardinesData: JardinesPorRegionYComuna = {};
  private jardinesAcumulados: Jardin[] = [];
  // Highcharts
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag: boolean = false;
// Agregar la configuración del mapa
//private regionSubscription: Subscription | undefined;



// Configuración actualizada del mapa
mapChart: Highcharts.Options = {
  chart: {
    type: 'map',
    backgroundColor: 'transparent'
  },
  title: {
    text: undefined
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    }
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, '#FFFFFF'],
      [0.5, '#90caf9'],
      [1, '#1976d2']
    ]
  },
  series: [{
    type: 'map',
    name: 'Región',
    states: {
      hover: {
        color: '#a4edba'
      }
    },
    dataLabels: {
      enabled: true,
      format: '{point.name}'
    },
    data: []
  } as MapSeriesOptions]
};

// Datos del mapa
mapData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          // Aquí irían las coordenadas de la región
          // Ejemplo simplificado:
          [
            [-70.2, -20.1],
            [-70.1, -20.2],
            [-70.0, -20.1],
            [-70.2, -20.1]
          ]
        ]
      },
      properties: {
        name: 'Tarapacá'
      }
    }
    // Agregar más features según necesites
  ]
};
  // Charts options
  histogramChart: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: { text: 'Histograma' },
    xAxis: {
      categories: ['200', '300', '400', '500', '600', '700', '800'],
      title: { text: 'Ser de las Competencias' }
    },
    yAxis: {
      title: { text: 'Frecuencia' }
    },
    series: [{
      type: 'column',
      name: 'Frecuencia',
      color: '#90caf9',
      data: [2, 4, 8, 12, 8, 4, 2]
    }],
    credits: { enabled: false }
  };

  barChart: Highcharts.Options = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent'
    },
    title: { text: 'Datos Power BI' },
    xAxis: { categories: ['Categoría 1', 'Categoría 2', 'Categoría 3'] },
    yAxis: {
      title: { text: 'Valores' }
    },
    series: [{
      type: 'bar',
      name: 'Valores',
      color: '#64b5f6',
      data: [4, 6, 3]
    }],
    credits: { enabled: false }
  };

  columnChart: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: { text: 'Datos Power BI' },
    xAxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
    yAxis: {
      title: { text: 'Valores' }
    },
    series: [{
      type: 'column',
      name: 'Series 1',
      color: '#42a5f5',
      data: [5, 3, 4, 7]
    }],
    credits: { enabled: false }
  };

  pieChart: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent'
    },
    title: { text: 'Datos Power BI' },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f}%'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Valores',
      data: [
        { name: 'Categoría 1', y: 60, color: '#2196f3' },
        { name: 'Categoría 2', y: 25, color: '#90caf9' },
        { name: 'Categoría 3', y: 15, color: '#bbdefb' }
      ]
    }],
    credits: { enabled: false }
  };

  // Estado
  year: number = 2024;
  selectedRegion: string = '';
  selectedJardin: string = '';
  
  // Datos de ejemplo
  regions: string[] = ['Tarapacá', 'Antofagasta', 'Atacama'];
  jardines: string[] = ['Jardín 1', 'Jardín 2', 'Jardín 3'];
  
  // Indicadores
  indicators = {
    accidentes: 80000,
    diagnosticoNormal: 21.00,
    indicator3: 0.000,
    indicator4: 0.00,
    indicator5: 0.00,
    indicator6: 0.00
  };
  chart: any;
  headerColor: string | undefined;
  cardColor: string | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService,
    public mapColorsService: MapColorsService,  // Agregar esta línea
    private wsAdmSolService: WS_ADM_SOLService,  // Agregar el nuevo servicio
    private dashboardState: DashboardStateService,
    
  ) {this.loadRegionDataFromSidebar(1);}

  private clearState(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    this.jardinesAcumulados = [];
    this.JardinesporRegion = [];
    this.mapInitialized = false;
    this.updatePending = false;
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
    console.log('Estado limpiado');
  }
  
  ngOnInit(): void {

    
    try {
      // Limpiar el estado inicial del componente
      this.clearState();
      
      // Registro inicial
      console.log('Iniciando componente Dashboard');
  
      // Suscribirse a los cambios de navegación para manejar las actualizaciones de la región seleccionada
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd), // Filtrar solo eventos de navegación finalizada
          takeUntil(this.destroy$) // Limitar la vida útil de la suscripción para evitar fugas de memoria
        )
        .subscribe({
          next: () => {
            const regionId = Number(this.route.snapshot.paramMap.get('regionId'));
  
            if (isNaN(regionId)) {
              console.warn('El ID de la región no es válido:', regionId);
              return;
            }
  
            console.group('Cambio de Navegación Detectado');
            console.log('Region ID:', regionId);
  
            // Actualizar el estado del Dashboard
            this.dashboardState.setRegionalView(regionId);
  
            console.log('Estado del Dashboard actualizado:', {
              region: this.dashboardState.selectedRegion,
              vistaNacional: this.dashboardState.vistaNacional
            });
            console.groupEnd();
  
            // Cargar datos de la región seleccionada
            this.loadRegionDataFromSidebar(regionId);
          },
          error: (error) => {
            console.error('Error en la suscripción a los cambios de navegación:', error);
          }
        });
    } catch (error) {
      console.error('Error al inicializar el componente Dashboard:', error);
    }
  }
  
  private async initializeMapData() {
    try {
      const regionId = 1; // Cambia esto según sea necesario
      const mapDataUrl = this.getGeoJsonUrl(regionId);
  
      console.log('Cargando datos del mapa desde:', mapDataUrl);
      const response = await this.fetchMapData(mapDataUrl);

      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const mapData = await response.json();
      console.log('Datos del mapa cargados:', mapData);
  
      // Agregar el mapa al objeto Highcharts.maps sin sobrescribir
      //(Highcharts as any).maps[`region-${regionId}`] = mapData;
  
      // Actualizar las opciones del mapa
      this.mapChart = {
        ...this.mapChart,
        chart: {
          ...this.mapChart.chart,
          map: `region-${regionId}` // Referenciar el mapa registrado
        },
      };
  
      this.updateFlag = true;
      console.log('Mapa inicializado correctamente para la región:', `region-${regionId}`);
    } catch (error) {
      console.error('Error cargando datos del mapa:', error);
    }
  }
  

  
  private async loadRegionDataFromSidebar(regionId: number) {
    if (this.updatePending) {
      console.log('Actualización pendiente, esperando...');
      return;
    }
  
    this.updatePending = true;
    console.log('Iniciando carga de región:', regionId);
  
    try {
      // Limpiar datos anteriores
      this.jardinesAcumulados = [];
      this.JardinesporRegion = [];
  
      // Esperar a que los datos se carguen
      await new Promise<void>((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 10;
        
        const checkData = () => {
          this.loadData(regionId.toString());
          attempts++;
          
          console.log(`Intento ${attempts} de cargar datos:`, {
            acumulados: this.jardinesAcumulados.length,
            porRegion: this.JardinesporRegion.length
          });
  
          if (this.JardinesporRegion.length > 0) {
            resolve();
          } else if (attempts >= maxAttempts) {
            reject(new Error('Máximo de intentos alcanzado'));
          } else {
            setTimeout(checkData, 1000);
          }
        };
  
        checkData();
      });
  
      console.log('Datos cargados:', {
        totalJardines: this.JardinesporRegion.length,
        primerosJardines: this.JardinesporRegion.slice(0, 3).map(j => ({
          nombre: j.nombreJardin,
          comuna: j.comuna,
          coords: [j.latitud, j.longitud]
        }))
      });
  
      // Cargar datos del mapa
      const mapDataUrl = this.getGeoJsonUrl(regionId);
      const mapData = await this.fetchMapData(mapDataUrl);
      
      if (!mapData) {
        throw new Error('No se pudo cargar el mapa');
      }
  
      const seriesData = this.processMapData(mapData);
      
      // Actualizar región y mapa
      this.currentRegionId = regionId;
      this.RegionSeleccionada = this.getRegionNameById(regionId);
  
      // Obtener colores dinámicos para el encabezado y las tarjetas
      const headerColor = this.mapColorsService.getRegionLightColor(this.RegionSeleccionada);
      const cardColor = this.mapColorsService.getRegionDarkColor(this.RegionSeleccionada);
      
      // Aplicar los colores
      this.applyColors(headerColor, cardColor);
  
      await this.renderMap(mapData, seriesData);
  
    } catch (error) {
      console.error('Error cargando región:', error);
    } finally {
      this.updatePending = false;
    }
  }

  // Método adicional para aplicar los colores al encabezado y las tarjetas
private applyColors(headerColor: string, cardColor: string): void {
  this.headerColor = headerColor;
  this.cardColor = cardColor;
  console.log('Colores aplicados:', { headerColor, cardColor });
}
// Método corregido para procesar datos del mapa
private processMapData(mapData: any) {
  if (!mapData || !mapData.features) {
    console.warn('Datos del mapa no válidos');
    return [];
  }

  console.log('Procesando región:', this.RegionSeleccionada);
  this.mapColorsService.logRegionInfo(this.RegionSeleccionada);

  return mapData.features.map((f: any) => {
    try {
      const nombreComuna = f.properties?.['Comuna'] || '';
      const color = this.mapColorsService.getCommuneColor(this.RegionSeleccionada, nombreComuna);

      if (!color) {
        console.warn(`No se encontró color para la comuna: ${nombreComuna} en la región: ${this.RegionSeleccionada}`);
      }
      return {
        'hc-key': nombreComuna,
        name: nombreComuna,
        cantidadJardines: f.properties?.['CantidadJardines'] || 0,
        codigoComuna: f.properties?.['CodCom'] || '',
        value: f.properties?.['CantidadJardines'] || 0,
        color: color || '#E6F3FF',  // Color por defecto si no se encuentra
        properties: f.properties
      };
    } catch (error) {
      console.error('Error procesando feature del mapa:', error);
      return null;
    }
  }).filter((item: null) => item !== null);
}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(region: string, offset: string = ''): void {
    console.log(`Cargando datos para región ${region}, offset: ${offset}`);
    
    if (!offset) {
      this.jardinesAcumulados = [];
    }
  
    this.wsAdmSolService.getData(region, offset).subscribe({
      next: (fields) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(fields, 'text/xml');
          
          const solmasElement = xmlDoc.getElementsByTagName('SOLMAS')[0];
          const solmas = solmasElement ? solmasElement.textContent?.trim() : '';
          
          console.log('SOLMAS:', solmas);
  
          const soloutElement = xmlDoc.getElementsByTagName('SOLOUT')[0];
          if (!soloutElement) {
            throw new Error('No se encontró el elemento SOLOUT');
          }
  
          const jsonContent = soloutElement.textContent;
          if (!jsonContent) {
            throw new Error('SOLOUT está vacío');
          }
  
          const jsonData = JSON.parse(jsonContent);
          const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
          
          console.log(`Procesando ${dataArray.length} jardines`);
  
          dataArray.forEach(item => {
            const primerJorNiv = item.Jor_Niv && item.Jor_Niv.length > 0 ? item.Jor_Niv[0] : null;
  
            const jardin: Jardin = {
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
              cjor: primerJorNiv ? primerJorNiv.Cjor || '' : '',
              jor: primerJorNiv ? primerJorNiv.Jor || '' : '',
              cniv: primerJorNiv ? primerJorNiv.Cniv || '' : '',
              niv: primerJorNiv ? primerJorNiv.Niv || '' : '',
              gru: primerJorNiv ? primerJorNiv.Gru || '' : '',
              cap: primerJorNiv ? primerJorNiv.Cap || '' : ''
            };
  
            this.jardinesAcumulados.push(jardin);
          });
  
          if (solmas && solmas !== '') {
            console.log(`Cargando más datos con offset: ${solmas}`);
            this.loadData(region, solmas);
          } else {
            console.log('Carga completa. Actualizando JardinesporRegion');
            this.JardinesporRegion = [...this.jardinesAcumulados];
            console.log('Jardines totales:', this.JardinesporRegion.length);
          }
  
        } catch (error) {
          console.error('Error procesando datos:', error);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio:', error);
      }
    });
  }

 // setYear(year: number): void {
 //   this.year = year;
 //   this.loadData();
 // }

 // filtrar(): void {
 //   this.loadData();
//  }

  private updateCharts(): void {
    this.updateFlag = true;
  }

  exportPDF(): void {
    console.log('Exportando a PDF...');
    // Implementar lógica de exportación a PDF
  }
  private updateMap(): void {
    if (this.selectedRegion) {
      // Actualizar datos del mapa según la región seleccionada
      const mapSeries = this.mapChart.series?.[0] as Highcharts.SeriesMapOptions;
      if (mapSeries) {
        // Actualizar datos del mapa
        mapSeries.data = this.getRegionData(this.selectedRegion);
      }
      this.updateFlag = true;
    }
  }
  getRegionNameById(regionId: number): string {
    const regionNames: { [key: number]: string } = {
      1: 'Tarapacá',
      2: 'Antofagasta',
      3: 'Atacama',
      4: 'Coquimbo',
      5: 'Valparaíso', // ID para la Región de Valparaíso
      601: 'NorPoniente',
      602: 'Rural Norponiente',
      603:'Sur Oriente',
      7:'O’ higgins',
      8:'Maule',
      9:'Biobio',
      10:'Araucania',
      11:'Los Lagos',
      12:'Aysén',
      13:'Magallanes',
      14:'Los Ríos',
      15:'Arica y Parinacota',
      16:'Ñuble'
    };
  
    return regionNames[regionId] || 'Desconocida';
  }
  getGeoJsonUrl(regionId: number): string {
    const regionGeoJsonUrls: { [key: number]: string } = {
      1: '/assets/map/clta.geo.json',
      2: '/assets/map/clan.geo.json',
      3: '/assets/map/clat.geo.json',
      4: '/assets/map/clco.geo.json',
      5: '/assets/map/clvs.geo.json',
      601: '/assets/map/clrm_nor_oriente.geo.json',
      602:'/assets/map/clrm_ruralnor_poniente.geo.json',
      603:'/assets/map/clrm_sur_oriente.geo.json',
      7:'/assets/map/clog.geo.json',
      8:'/assets/map/clml.geo.json',
      9:'/assets/map/clbi.geo.json',
      10:'/assets/map/clar.geo.json',
      14:'/assets/map/cllr.geo.json',
      11:'/assets/map/clll.geo.json',
      12:'/assets/map/clay.geo.json',
      13:'/assets/map/clma.geo.json',
      15:'/assets/map/clap.geo.json',
      16:'/assets/map/clnu.geo.json'
    };

    return regionGeoJsonUrls[regionId] || '/assets/map/cl-all.geo.json';
  }
  getRegionCoordinates(region: string): [number, number] {
    const regionCoordinates: { [key: string]: [number, number] } = {
      'Tarapacá': [-69.6689, -20.2133],
      'Antofagasta': [-70.4000, -23.6500],
      'Atacama': [-70.2500, -27.3667],
      'Coquimbo': [-71.2500, -29.9533],
      'Valparaíso': [-71.6167, -33.0472], // Coordenadas aproximadas de Valparaíso
      'NorPoniente': [-80.77332956991316,-33.72414856743086] // Coordenadas aproximadas de Valparaíso
    };
  
    return regionCoordinates[region] || [0, 0]; // Valor predeterminado si la región no se encuentra
  }

  private async updateMapConfiguration(mapData: any) {
    try {
      const processedData = this.processMapData(mapData);
      const regionId = this.currentRegionId || 1;
      const mapKey = `region-${regionId}`;
  
      // Registrar el mapa usando el método addMap
      (Highcharts as any).Map.prototype.addMap(mapData, mapKey);
  
      this.mapChart = {
        ...this.mapChart,
        chart: {
          ...this.mapChart.chart,
          map: mapKey
        },
        series: [{
          type: 'map',
          name: this.RegionSeleccionada || 'Región',
          data: processedData,
          states: {
            hover: { color: '#a4edba' }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }] as Highcharts.SeriesMapOptions[]
      };
  
      this.updateFlag = true;
    } catch (error) {
      console.error('Error actualizando configuración:', error);
    }
  }

  createChartOptions(mapData: any): any {
    // Obtener coordenadas y colores usando el servicio
    const coordinates = this.getRegionCoordinates(this.RegionSeleccionada);
    const comunaColors = this.mapColorsService.getRegionColors(this.RegionSeleccionada);
  
    // Log para debugging
    console.log('Región seleccionada:', this.RegionSeleccionada);
    console.log('Colores disponibles:', comunaColors);
  
    // Procesar los datos del mapa
    const seriesData = mapData.features.map((f: any) => {
      const nombreComuna = f.properties['Comuna'];
      const color = this.mapColorsService.getCommuneColor(this.RegionSeleccionada, nombreComuna);
      
      return {
        'hc-key': nombreComuna,
        value: f.properties['CantidadJardines'] || 0,
        color: color,
        name: nombreComuna,
        codigoComuna: f.properties['CodCom'],
        cantidadJardines: f.properties['CantidadJardines'] || 0,
        properties: f.properties
      };
    });
  
    return {
      chart: {
        map: mapData,
        backgroundColor: '#ffffff',
        style: {
          fontFamily: 'Arial, sans-serif'
        },
        events: {
          load: function(this: Highcharts.MapChart) {
            try {
              const chart = this as any;
              if (chart.mapView) {
                const bounds = chart.series[0].bounds;
                if (bounds) {
                  const centerX = (bounds.x1 + bounds.x2) / 2;
                  const centerY = (bounds.y1 + bounds.y2) / 2;
  
                  const padding = 0.1;
                  const containerAspectRatio = chart.chartWidth / chart.chartHeight;
                  const boundsWidth = bounds.x2 - bounds.x1;
                  const boundsHeight = bounds.y2 - bounds.y1;
                  const boundsAspectRatio = boundsWidth / boundsHeight;
  
                  let zoom;
                  if (containerAspectRatio > boundsAspectRatio) {
                    zoom = (chart.chartHeight / boundsHeight) * (1 - padding);
                  } else {
                    zoom = (chart.chartWidth / boundsWidth) * (1 - padding);
                  }
  
                  chart.mapView.setView(
                    [centerY, centerX],
                    zoom,
                    false
                  );
  
                  chart.mapView.minZoom = zoom * 0.5;
                  chart.mapView.maxZoom = zoom * 4;
                }
              }
            } catch (error) {
              console.error('Error en el evento load del mapa:', error);
            }
          }
        }
      },
      title: {
        text: 'Mapa de ' + this.RegionSeleccionada,
        style: {
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      plotOptions: {
        map: {
          allAreas: true,
          nullColor: '#E6F3FF',
          borderColor: '#A0A0A0',
          borderWidth: 0.5,
          states: {
            hover: {
              color: '#a4edba',
              borderColor: '#303030',
              borderWidth: 2
            }
          }
        }
      },
      series: [{
        type: 'map',
        name: 'Comunas',
        mapData: mapData,
        data: seriesData,
        joinBy: ['Comuna', 'hc-key'],
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            color: 'black',
            textOutline: '2px white',
            fontWeight: 'normal',
            fontSize: '11px'
          }
        }
      }]
    };
  }
  private initializeMap(): void {
    console.log('Inicializando mapa para la región:', this.RegionSeleccionada);
    const mapDataUrl = this.getGeoJsonUrl(1);
    
      
      
    if (!this.chartOptions) {
      console.error('No hay opciones de mapa disponibles');
      return;
    }
  
    try {
      const mapOptions: Highcharts.Options = {
        chart: {
          map: this.chartOptions.chart.map,
          height: '65%', // Ajustado para mantener consistencia
          backgroundColor: '#ffffff',
          style: {
            fontFamily: 'Arial, sans-serif'
          },
          panning: {
            enabled: true,
            type: 'xy'
          },
          zooming: {
            type: 'xy'
          },
          events: {
            fullscreenOpen: function(this: Highcharts.Chart) {
              const chartDiv = this.container.parentNode as HTMLElement;
              if (chartDiv) {
                chartDiv.style.maxHeight = '500px';
                chartDiv.style.height = '500px';
              }
            },
            load: function() {
              setTimeout(() => {
                try {
                  const chartRef = this as unknown as Highcharts.Chart & {
                    mapView?: any;
                  };
  
                  const series = chartRef.series[0];
                  if (series && (series as any).bounds) {
                    const bounds = (series as any).bounds;
                    const padding = 0.1;
                    const width = bounds.x2 - bounds.x1;
                    const height = bounds.y2 - bounds.y1;
                    const centerX = (bounds.x1 + bounds.x2) / 2;
                    const centerY = (bounds.y1 + bounds.y2) / 2;
  
                    const containerWidth = chartRef.chartWidth || 0;
                    const containerHeight = chartRef.chartHeight || 0;
  
                    const scaleX = containerWidth / (width * (1 + padding * 2));
                    const scaleY = containerHeight / (height * (1 + padding * 2));
                    const zoomFactor = 2;
                    const zoom = Math.min(scaleX, scaleY) * zoomFactor;
  
                    if (chartRef.mapView && typeof chartRef.mapView.setView === 'function') {
                      chartRef.mapView.setView(
                        [centerY, centerX],
                        zoom,
                        false
                      );
                      
                      // Configurar límites de zoom
                      chartRef.mapView.minZoom = 0.5;
                      chartRef.mapView.maxZoom = 10;
                    }
                  }
                } catch (error) {
                  console.error('Error ajustando la vista del mapa:', error);
                }
              }, 100);
            }
          }
        },
        mapView: {
          projection: {
            name: undefined
          }
        },
        title: {
          text: 'Mapa de ' + this.RegionSeleccionada,
          style: {
            fontSize: '18px',
            fontWeight: 'bold'
          }
        },
        mapNavigation: {
            enabled: true,
            enableDoubleClickZoom: false,
            enableMouseWheelZoom: true,
            enableTouchZoom: true,
            mouseWheelSensitivity: 1.1,
            buttons: {
              zoomIn: {
                text: '+',
                onclick: function() {
                  if ((this as any).chart?.mapView) {
                    (this as any).chart.mapView.zoomBy(1.2);
                  }
                }
              },
              zoomOut: {
                text: '-',
                onclick: function() {
                  if ((this as any).chart?.mapView) {
                    (this as any).chart.mapView.zoomBy(0.8);
                  }
                }
              }
            }
          },
        colorAxis: [{
          min: 0,
          max: 100,
          minColor: '#E6F3FF',
          maxColor: '#1565C0',
          showInLegend: false
        }],
        tooltip: {
          enabled: true,
          headerFormat: '',
          pointFormat: `
            <div style="text-align: center;">
              <span style="font-size: 14px; font-weight: bold;">{point.name}</span><br/>
              <span style="font-size: 12px;">Código Comuna: {point.codigoComuna}</span><br/>
              <span style="font-size: 12px;">Cantidad de Jardines: {point.value}</span><br/>
            </div>
          `,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderWidth: 1,
          borderColor: '#AAA',
          borderRadius: 8,
          shadow: true,
          useHTML: true
        },
        series: [{
          type: 'map',
          name: 'Comunas',
          data: this.chartOptions.series[0].data,
          mapData: this.chartOptions.chart.map,
          joinBy: ['Comuna', 'hc-key'],
          states: {
            hover: {
              brightness: 0.1,
              borderColor: '#303030',
              borderWidth: 2
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              color: 'black',
              textOutline: '2px white',
              fontWeight: 'normal',
              fontSize: '11px'
            }
          }
        } as any],
        credits: {
          enabled: false
        }
      };
  
      // Limpiar el contenedor antes de crear un nuevo mapa
      const container = document.getElementById('map-container');
      if (container) {
        // Destruir el mapa existente si existe
        if (this.chart) {
          this.chart.destroy();
        }
  
        console.log('Creando nuevo mapa');
        this.chart = Highcharts.mapChart('map-container', mapOptions);
        
        // Configurar eventos después de la inicialización
        if (container && (this.chart as any).mapView) {
          const mapView = (this.chart as any).mapView;
          
          container.addEventListener('wheel', (e: WheelEvent) => {
            e.preventDefault();
            if (mapView) {
              const currentZoom = mapView.zoom || 2;
              const zoomDelta = e.deltaY > 0 ? -0.2 : 0.2;
              const newZoom = Math.max(0.5, Math.min(10, currentZoom + zoomDelta));
              mapView.setZoom(newZoom);
            }
          }, { passive: false });
        }
        
        console.log('Mapa creado exitosamente');
      } else {
        console.error('Contenedor del mapa no encontrado');
      }
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }
  }
  private async loadMapData(regionId: number): Promise<void> {
    console.log('Cargando datos del mapa para la región:', regionId);
    const mapDataUrl = this.getGeoJsonUrl(regionId);

    try {
      const response = await fetch(mapDataUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const mapData = await response.json();
      //console.log('Datos GeoJSON recibidos');
      
      this.chartOptions = this.createChartOptions(mapData);
      
      // Usar requestAnimationFrame para asegurar que el DOM esté listo
      requestAnimationFrame(() => {
        if (document.getElementById('map-container')) {
          this.initializeMap();
        } else {
          console.error('Contenedor del mapa no encontrado');
        }
      });
    } catch (error) {
      console.error('Error al cargar el mapa:', error);
    }
  }

  private updateRegion(regionId: number): void {
    console.log('Actualizando región:', regionId);
    this.RegionSeleccionada = this.getRegionNameById(regionId);
    
    // Destruir el mapa existente antes de cargar uno nuevo
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    
    this.loadMapData(regionId);
  }

  private getRegionData(region: string): Array<[string, number]> {
    const regionData: RegionData = {
      'Tarapacá': [
        ['Alto Hospicio', 10],
        ['Iquique', 15],
        ['Pica', 5],
        ['Pozo Almonte', 8]
      ]
    };
    
    return regionData[region] || [];
  }
  private async fetchMapData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo datos del mapa:', error);
      return null;
    }
  }
  private setupMapEventListeners(): void {
    if (!this.chart) return;

    const container = document.getElementById('map-container');
    if (!container) return;

    // Configurar zoom con rueda del mouse
    container.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      const mapView = (this.chart as any).mapView;
      if (!mapView) return;

      const zoomDelta = e.deltaY < 0 ? 1.1 : 0.9;
      requestAnimationFrame(() => {
        try {
          mapView.zoomBy(zoomDelta);
        } catch (error) {
          console.error('Error en zoom:', error);
        }
      });
    }, { passive: false });
  }
  
  private async renderMap(mapData: any, seriesData: any[]): Promise<void> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        try {
          if (typeof Highcharts.mapChart !== 'function') {
            console.error('El módulo de mapas no está inicializado.');
            return resolve();
          }
  
          const container = document.getElementById('map-container');
          if (!container) {
            console.error('No se encontró el contenedor del mapa');
            return resolve();
          }
  
          const mapOptions = this.createMapOptions(mapData, seriesData);
          if (this.chart) {
            this.chart.destroy();
            this.chart = undefined;
          }
  
          this.chart = Highcharts.mapChart('map-container', mapOptions);
          console.log('Mapa creado exitosamente.');
  
          this.setupMapEventListeners();
          resolve();
        } catch (error) {
          console.error('Error al renderizar el mapa:', error);
          resolve();
        }
      });
    });
  }
  
  
  
  
  // Método auxiliar para configurar el zoom con el scroll del mouse
  private setupWheelZoom(container: HTMLElement): void {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!this.chart || !(this.chart as any).mapView) return;
  
      const zoomDelta = e.deltaY > 0 ? 0.8 : 1.2; // Acercar o alejar
      requestAnimationFrame(() => {
        try {
          (this.chart as any).mapView.zoomBy(zoomDelta);
        } catch (error) {
          console.error('Error al hacer zoom con el scroll:', error);
        }
      });
    };
  
    container.removeEventListener('wheel', handleWheel); // Evitar duplicidad de eventos
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
  }
  
  private parseCoordinate(coord: string): number {
    try {
      if (!coord) return NaN;
  
      // Limpiar y normalizar la coordenada
      let cleanCoord = coord.toString()
        .replace(/['"°º\s]/g, '')  // Remover caracteres especiales
        .replace(/,/g, '.')        // Reemplazar comas por puntos
        .trim();
  
      // Manejar coordenadas negativas
      if (cleanCoord.includes('S') || cleanCoord.includes('W') || cleanCoord.includes('O')) {
        cleanCoord = '-' + cleanCoord.replace(/[SWON]/g, '');
      } else {
        cleanCoord = cleanCoord.replace(/[NESN]/g, '');
      }
  
      // Convertir a número
      const num = parseFloat(cleanCoord);
  
      // Validar el resultado
      if (isNaN(num)) {
        console.warn('Coordenada inválida después de procesar:', coord, '→', cleanCoord);
        return NaN;
      }
  
      return Number(num.toFixed(6));
    } catch (error) {
      console.error('Error parseando coordenada:', coord, error);
      return NaN;
    }
  }

  private isValidCoordinate(lat: number, lon: number): boolean {
    // Validar rango de coordenadas para Chile
    const isValidLat = lat >= -56 && lat <= -17; // Rango aproximado para Chile
    const isValidLon = lon >= -76 && lon <= -66; // Rango aproximado para Chile
  
    if (!isValidLat || !isValidLon) {
      console.warn('Coordenada fuera de rango:', { lat, lon });
    }
  
    return isValidLat && isValidLon;
  }

  private processJardinesPoints(): any[] {
    console.log('Procesando jardines:', this.JardinesporRegion.length);
  
  const points = this.JardinesporRegion
    .filter(jardin => {
      const hasCoords = jardin.latitud && jardin.longitud;
      if (!hasCoords) {
        console.warn('Jardín sin coordenadas:', jardin.nombreJardin);
      }
      return hasCoords;
    })
    .map(jardin => {
      try {
        const lat = this.parseCoordinate(jardin.latitud);
        const lon = this.parseCoordinate(jardin.longitud);

        console.log('Procesando jardín:', {
          nombre: jardin.nombreJardin,
          latitudOriginal: jardin.latitud,
          longitudOriginal: jardin.longitud,
          latitudProcesada: lat,
          longitudProcesada: lon
        });
  
          // Verificar coordenadas válidas
          if (isNaN(lat) || isNaN(lon) || !this.isValidCoordinate(lat, lon)) {
            console.warn('Coordenadas inválidas para:', jardin.nombreJardin);
            return null;
          }
  
          return {
            type: 'mappoint',
          name: jardin.nombreJardin,
          lat: lat,
          lon: lon,
          coordinates: [lon, lat], // Agregar coordenadas en formato array
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 4,
            fillColor: '#FF1493',
            lineWidth: 1,
            lineColor: '#FFFFFF'
          },
            datos: {
              nombreJardin: jardin.nombreJardin || '',
              calle: jardin.calle || '',
              codCom: jardin.codCom || '',
              jardin: jardin.jardin || '',
              modalidad: jardin.modalidad || '',
              ubicacion: jardin.ubicacion || '',
              director: jardin.director || '',
              estado: jardin.estado || ''
            }
          };
        } catch (error) {
          console.error('Error procesando jardín:', jardin.nombreJardin, error);
          return null;
        }
      })
      .filter(point => point !== null);
  
    // Log final de resultados
    console.log('Puntos procesados exitosamente:', points.length);
    console.log('Muestra de puntos:', points.slice(0, 3));
  
    return points;
  } 
// Método para manejar el cambio de selección de la región
onRegionSelect(region: string): void {
  this.RegionSeleccionada = region;
  
}
private createMapOptions(mapData: any, seriesData: any[]): Highcharts.Options {
  const jardinesPoints = this.processJardinesPoints();

  // Asegurarse de que los colores se apliquen correctamente
  const dataWithColors = seriesData.map(item => ({
    ...item,
    color: this.mapColorsService.getCommuneColor(this.RegionSeleccionada, item.name) || '#E6F3FF'
  }));

  return {
    chart: {
      map: mapData,
      backgroundColor: '#ffffff',
      height: '500px',
      style: {
        fontFamily: 'Arial, sans-serif'
      },
      animation: {
        duration: 1000
      },
      
      events: {
        fullscreenOpen: function(this: Highcharts.Chart) {
          const chartDiv = this.container.parentNode as HTMLElement;
          if (chartDiv) {
            chartDiv.style.maxHeight = '500px';
            chartDiv.style.height = '500px';
          }
        },
        load: function() {
          try {
            const chart = this as any;
            if (chart.mapView) {
              const bounds = chart.series[0].bounds;
              if (bounds) {
                const centerX = (bounds.x1 + bounds.x2) / 2;
                const centerY = (bounds.y1 + bounds.y2) / 2;

                const padding = 0.1;
                const containerAspectRatio = chart.chartWidth / chart.chartHeight;
                const boundsWidth = bounds.x2 - bounds.x1;
                const boundsHeight = bounds.y2 - bounds.y1;
                const boundsAspectRatio = boundsWidth / boundsHeight;

                let zoom;
                if (containerAspectRatio > boundsAspectRatio) {
                  zoom = (chart.chartHeight / boundsHeight) * (1 - padding);
                } else {
                  zoom = (chart.chartWidth / boundsWidth) * (1 - padding);
                }

                chart.mapView.setView(
                  [centerY, centerX],
                  zoom,
                  false
                );

                chart.mapView.minZoom = zoom * 0.5;
                chart.mapView.maxZoom = zoom * 4;
              }
            }
          } catch (error) {
            console.error('Error en el evento load del mapa:', error);
          }
        }
      }
    },
    title: {
      text: 'Mapa de ' + this.RegionSeleccionada,
      style: {
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    mapView: {
      projection: {
        name: 'WebMercator'
      }
    },
    mapNavigation: {
      enabled: true,
      enableButtons: true,
      enableDoubleClickZoom: false,
      enableMouseWheelZoom: true,
      enableTouchZoom: true,
      buttonOptions: {
        verticalAlign: 'middle',
        align: 'right',
        width: 30,
        height: 30,
        style: {
          fontSize: '15px',
          fontWeight: 'bold'
        }
      },
      buttons: {
        zoomIn: {
          text: '+',
          onclick: function(e: MouseEvent) {
            e.preventDefault();
            e.stopPropagation();
            const chart = (this as any).chart;
            if (chart.mapView) {
              chart.mapView.zoomBy(1.25);
            }
          }
        },
        zoomOut: {
          text: '-',
          onclick: function(e: MouseEvent) {
            e.preventDefault();
            e.stopPropagation();
            const chart = (this as any).chart;
            if (chart.mapView) {
              chart.mapView.zoomBy(0.8);
            }
          }
        }
      }
    },
    colorAxis: undefined,
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        animation: {
          duration: 500
        },
        states: {
          hover: {
            brightness: 0.1
          },
          inactive: {
            opacity: 1
          }
        }
      },
      map: {
        nullInteraction: true,
        allAreas: true,
        enableMouseTracking: true,
        states: {
          hover: {
            brightness: 0.1
          }
        }
      }
    },
    series: [
      {
        type: 'map',
        name: 'Comunas',
        states: {
          hover: {
            brightness: 0.1,
            borderColor: '#303030',
            borderWidth: 2
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            color: 'black',
            textOutline: '2px white',
            fontWeight: 'normal',
            fontSize: '11px'
          }
        },
        data: dataWithColors,
        joinBy: ['Comuna', 'hc-key'],
        borderColor: '#A0A0A0',
        borderWidth: 0.5,
        nullColor: '#E6F3FF'
      } as any,
      {
        type: 'mappoint',
        name: 'Jardines',
        color: '#FF1493',
        data: jardinesPoints.map(jardin => ({
          ...jardin,
          value: jardin.datos.cantidadJardines  // Asegúrate de que el punto tenga un valor "cantidadJardines"
        })),
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 10,  // Ajusta el tamaño del marcador para que el número sea visible
          fillColor: '#FF1493',
          lineWidth: 1,
          lineColor: '#FFFFFF'
        },
        dataLabels: {
          enabled: true,
          format: '{point.value}',  // Muestra la cantidad de jardines en cada marcador
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textOutline: '1px contrast'
          },
          align: 'center',
          verticalAlign: 'middle',
          inside: true
        },
        tooltip: {
          headerFormat: '',
          pointFormat: `
            <div style="padding: 10px; border-radius: 8px; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
              <h4 style="margin: 0 0 8px 0; color: #333;">{point.datos.nombreJardin}</h4>
              <p style="margin: 4px 0;"><strong>Dirección:</strong> {point.datos.calle}</p>
              <p style="margin: 4px 0;"><strong>Comuna:</strong> {point.datos.codCom}</p>
              <p style="margin: 4px 0;"><strong>Director:</strong> {point.datos.director}</p>
              <p style="margin: 4px 0;"><strong>Código Jardín:</strong> {point.datos.jardin}</p>
              <p style="margin: 4px 0;"><strong>Modalidad:</strong> {point.datos.modalidad}</p>
              <p style="margin: 4px 0;"><strong>Estado:</strong> {point.datos.estado}</p>
              <p style="margin: 4px 0;"><strong>Ubicación:</strong> {point.datos.ubicacion}</p>
            </div>
          `
        },
        point: {
          events: {
            mouseOver: function(this: any) {
              if (this.graphic) {
                this.graphic.attr({
                  r: 12,  // Aumenta el radio al pasar el mouse
                  fillColor: '#FF69B4'  // Cambia el color al pasar el mouse
                });
              }
            },
            mouseOut: function(this: any) {
              if (this.graphic) {
                this.graphic.attr({
                  r: 10,  // Restaura el radio original
                  fillColor: '#FF1493'  // Restaura el color original
                });
              }
            }
          }
        }
      }
    ],
    credits: {
      enabled: false
    }
  };
}
}