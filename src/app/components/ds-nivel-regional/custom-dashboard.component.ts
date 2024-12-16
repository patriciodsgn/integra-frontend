import { inject } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ElemButtonComponent } from '../elem-button/elem-button.component';
import { RouterModule } from '@angular/router';
import { ButtonStateService } from '../../button-state.service';

import { faChild, faBed, faBaby, faPeopleRoof, 
    faCloudSun, faMapMarkedAlt, faBus, 
    faChartLine, faSchool, faUsers, faShieldAlt, 
    faBuilding, faTree, faBabyCarriage, faCalendar, 
    faChalkboardTeacher, faDesktop, faGlobe, 
    faPeopleArrows, faGraduationCap, 
    faDollarSign,
    faChartPie,
    faCheckCircle,
    faRotate,
    faBox,
    faHeart,
    faCog,
    faBook,
    faCalendarDays,
    faHome,
    faShoppingCart,
    faBuildingCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import AccessibilityModule from 'highcharts/modules/accessibility';
MapModule(Highcharts);
AccessibilityModule(Highcharts);
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import ExportingModule from 'highcharts/modules/exporting';
import FullScreenModule from 'highcharts/modules/full-screen';
import { JardinesPorRegionYComuna } from 'src/app/services/shared-data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { WS_ADM_SOLService } from 'src/app/services/WS_ADM_SOL.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapColorsService } from 'src/app/services/map-colors.service';

import OfflineExportingModule from 'highcharts/modules/offline-exporting';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DashboardStateService } from '../../core/services/dashboard-state.service';
// Asegúrate de inicializar los módulos de exportación
ExportingModule(Highcharts);
OfflineExportingModule(Highcharts);

interface JardinPoint {
  lat: number;
  lon: number;
  datos: {
    nombreJardin: string;
    calle: string;
    codCom: string;
    jardin: string;
    modalidad: string;
    ubicacion: string;
    director: string;
    estado: string;
  };
}

interface ButtonData {
  eb_icon: string;
  eb_title: string;
  eb_subtitle: string;
  eb_disable: boolean;
  eb_bg_color: string;
  eb_text_color: string;
  eb_link: string;
}

interface ModalidadCount {
  modalidad: string;
  count: number;
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
    nivel?: string;  // Añadir el campo nivel
   
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
  interface TarjetaItem {
    titulo: string;
    icon: IconDefinition;
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
interface TarjetaSuperior {
  valor: number;
  titulo: string;
  icon: IconProp;  // Cambia a IconDefinition si es necesario
}


ExportingModule(Highcharts);
FullScreenModule(Highcharts);
@Component({
  selector: 'app-custom-dashboard',
  templateUrl: './custom-dashboard.component.html',
  styleUrls: ['./custom-dashboard.component.css'],
})
export class CustomDashboardComponent implements OnInit, OnDestroy {

  public buttonStateService = inject(ButtonStateService);
  buttons1: ButtonData[] = [
    { eb_icon: 'bar_chart', eb_title: 'Ejecución Presupuestaria', eb_subtitle: 'Presupuesto Total', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/daft/ejecucion_presupuestaria' },
    { eb_icon: 'account_balance_wallet', eb_title: 'Saldo por Ejecutar', eb_subtitle: 'Presupuesto Restante', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/daft/saldo_por_ejecutar' },
    { eb_icon: 'savings', eb_title: 'Presupuesto Comprometido', eb_subtitle: 'Fondos Reservados', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'percent', eb_title: 'Porcentaje de Ejecución', eb_subtitle: 'Progreso Financiero', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
  ];
  buttons2: ButtonData[] = [
    { eb_icon: 'favorite', eb_title: 'RO', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dpgr/ro' },
    { eb_icon: 'eco', eb_title: 'Sello Verde', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dpgr/sello_verde' },
    { eb_icon: 'groups', eb_title: 'Pueblos Originarios', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dpgr/pueblos_originarios' },
    { eb_icon: 'public', eb_title: 'Nacionalidad', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dpgr/nacionalidad' },
  ];
  buttons3: ButtonData[] = [
    { eb_icon: 'local_hospital', eb_title: 'Accidentes', eb_subtitle: '', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dppi/accidentes' },
    { eb_icon: 'restaurant', eb_title: 'Situación Nutricional', eb_subtitle: '', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dppi/situacion_nutricional' },
    { eb_icon: 'child_care', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'emergency', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
  ];
  buttons4: ButtonData[] = [
    { eb_icon: 'school', eb_title: 'NEE', eb_subtitle: 'Ejemplo', eb_disable: false , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/educacion/nee'},
    { eb_icon: 'person', eb_title: 'ATET', eb_subtitle: 'Ejemplo', eb_disable: false , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/educacion/atet'},
    { eb_icon: 'family_restroom', eb_title: 'Familias', eb_subtitle: 'Data disponible 2025', eb_disable: true , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/'},
    { eb_icon: 'analytics', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true , eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/'},
  ];
  buttons5: ButtonData[] = [
    { eb_icon: 'sync_alt', eb_title: 'Rotación', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/personas/rotacion' },
    { eb_icon: 'hourglass_empty', eb_title: 'Permanencia', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/personas/permanencia' },
    { eb_icon: 'event_busy', eb_title: 'Ausentismo', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/personas/ausentismo' },
    { eb_icon: 'groups', eb_title: 'Planta Contratada', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/personas/planta_contratada' },
  ];
  buttons6: ButtonData[] = [
    { eb_icon: 'sync_alt', eb_title: 'Rotación', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/costos/' },
    { eb_icon: 'hourglass_empty', eb_title: 'Permanencia', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/costos/' },
    { eb_icon: 'event_busy', eb_title: 'Ausentismo', eb_subtitle: 'Ejemplo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/costos/' },
    { eb_icon: 'groups', eb_title: 'Planta Contratada', eb_subtitle: 'Ejemplo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/costos/' },
  ];


  getRegionTextColor(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private storageListener: any;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  public backgroundColor: string = '#F5F5F5'; // Color predeterminado
  public cardColor: string = '#9E9E9E';       // Color predeterminado para las tarjetas
  headerColor: string = '#E6F3FF';  // Color de fondo inicial del encabezado
  private chart: Highcharts.Chart | undefined;
  private currentRegionId: number | null = null;
  private readonly destroy$ = new Subject<void>();
  JardinesporRegion: Jardin[] = [];
  RegionSeleccionada: string = '';
  fechaActual: string = new Date().toLocaleDateString();
  chartOptions: any;
  
  private mapInitialized = false;
  private updatePending = false;
  private readonly debounceTime = 250; // ms
  private updateTimeout: any;
  informacionAdicional: InfoAdicional[] = [];
  //jardinesData: { [region: string]: { [comuna: string]: number } } = {};
  jardinesData: JardinesPorRegionYComuna = {};
  private jardinesAcumulados: Jardin[] = [];
    
  // Font Awesome icons
  faChild = faChild;
  faBed = faBed;
  faBaby = faBaby;
  faPeopleRoof = faPeopleRoof;
  faBus = faBus;
  faShieldAlt = faShieldAlt;
  faBuilding = faBuilding;
  faTree = faTree;
  faChalkboardTeacher = faChalkboardTeacher;
  faGlobe = faGlobe;
  faUsers = faUsers;
  faGraduationCap = faGraduationCap;
  faPeopleArrows = faPeopleArrows;
  faDesktop = faDesktop;
  faCalendar = faCalendar;
  faDollarSign=faDollarSign;
  faChartPie=faChartPie;
  faCheckCircle=faCheckCircle
  faRotate=faRotate;
  faBox=faBox;
  faHeart=faHeart;
  faCog=faCog;
  faBook=faBook;
  faCalendarDays=faCalendarDays;
  faHome=faHome;
  faBuildingCircleXmark=faBuildingCircleXmark;

  tarjetasSuperiores: TarjetaSuperior[] = [
    { valor: 0, titulo: 'Establecimientos', icon: faHome },
    { valor: 0, titulo: 'Salas Cuna y Jardines Infantiles', icon: faBaby },
    { valor: 0, titulo: 'Jardines Infantiles', icon: faBed },
    { valor: 0, titulo: 'Salas Cuna', icon: faShoppingCart },
    { valor: 0, titulo: 'Modalidad No convencional', icon: faChild },
    { valor: 0, titulo: 'Jardines Sobre Ruedas', icon: faBus },
  ];

  tarjetasInferiores: TarjetaItem[] = [
    { titulo: 'Ejecución Presupuestaria', icon: faDollarSign },
    { titulo: 'Rendición y Costos CMM', icon: faChartPie },
    { titulo: 'Total Anticipos Fondos Adelantados', icon: faUsers },
    { titulo: 'Presupuestos Negativos Informes', icon: faCheckCircle },
    { titulo: 'Rotación Ejemplo', icon: faRotate },
    { titulo: 'Permanencia Ejemplo', icon: faBuilding },
    { titulo: 'Ausentismo Ejemplo', icon: faCalendarDays },
    { titulo: 'Indicador 1 Ejemplo', icon: faBox },
    { titulo: 'NEE Ejemplo', icon: faGraduationCap },
    { titulo: 'ATET Ejemplo', icon: faBook },
    { titulo: 'Indicador 1 Ejemplo', icon: faHeart },
    { titulo: 'Indicador 1 Ejemplo', icon: faCog }
];

tarjetaEstablecimientos: any;
tarjetaJardinSobreRuedas: any;
establecimientosColor: any;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService,
    public mapColorsService: MapColorsService,  // Agregar esta línea
    private wsAdmSolService: WS_ADM_SOLService,  // Agregar el nuevo servicio
    private dashboardState: DashboardStateService
  ) {
    this.setupStorageListener();
  }

  private isLoading = false;

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
    //console.log('Estado limpiado');
  }
  private loadEstablecimientosData(regionId: string): void {
    this.wsAdmSolService.getEstablecimientos(regionId).subscribe({
        next: (response) => {
            if (response) {
                // Actualizar las tarjetas superiores con los datos
                this.tarjetasSuperiores = [
                    { 
                        valor: response.totalEstablecimientos,
                        titulo: 'Establecimientos',
                        icon: faHome 
                    },
                    { 
                        valor: response.totalSalaCunaJardin,
                        titulo: 'Salas Cuna y Jardines Infantiles',
                        icon: faBaby 
                    },
                    { 
                        valor: response.totalParvulos,
                        titulo: 'Jardines Infantiles',
                        icon: faBed 
                    },
                    { 
                        valor: response.totalSalaCuna,
                        titulo: 'Salas Cuna',
                        icon: faShoppingCart 
                    },
                    { 
                        valor: response.totalAdmDelegada,
                        titulo: 'Modalidad No convencional',
                        icon: faChild 
                    },
                    
                    { 
                        valor: response.totalSinFuncionamiento,
                        titulo: 'Sin Funcionamiento',
                        icon: faBuildingCircleXmark || faBuilding // Usar el ícono que mejor represente establecimientos sin funcionamiento
                    }
                ];
                console.log("response.totalAdmDelegada ", response.totalAdmDelegada);
                console.log('Datos de establecimientos cargados:', response);
            }
        },
        error: (error) => {
            console.error('Error al cargar datos de establecimientos:', error);
        }
    });
}
  private setupStorageListener(): void {
    
    this.storageListener = (event: StorageEvent) => {
      if (event.key === 'regionSeleccionada' || event.key === 'nivelAcceso') {
        // console.log('Cambio detectado en localStorage:', event.key);
        
        const regionData = localStorage.getItem('regionSeleccionada');
        const nivelAcceso = localStorage.getItem('nivelAcceso');

        if (nivelAcceso === 'nacional') {
          // console.log('Acceso Nacional detectado');
          //this.loadRegionDataFromSidebar(0);
        } else if (regionData) {
          const region = JSON.parse(regionData);
          // console.log('Nueva región seleccionada:', region);
          this.loadRegionDataFromSidebar(Number(region.CodigoRegion));
        }
      }
    };

    window.addEventListener('storage', this.storageListener);
  }

  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  onButtonClick(index: number): void {
    this.buttonStateService.setActiveButton(index); // Cambia el botón activo
    // console.log(`Botón seleccionado: ${this.buttons1[index].eb_title}`);
  }


  ngOnInit(): void {
    // Declaramos codigoRegion al inicio para tenerlo disponible en todo el método
    let codigoRegion: number | null = null;

    this.updateRegionColors();
    this.setRegionColors();
    this.clearState();
    
    // Inicialización con datos del localStorage
    const regionData = localStorage.getItem('regionSeleccionada');
    const nivelAcceso = localStorage.getItem('nivelAcceso');

    // Procesamos los datos de la región
    if (regionData) {
        const region = JSON.parse(regionData);
        codigoRegion = region.CodigoRegion;
        console.log("codigoRegion:", codigoRegion);
    } else {
        console.log('No hay región seleccionada en localStorage');
    }

    console.log("Region x:", regionData);
    console.log("nivelAcceso:", nivelAcceso);

    if (nivelAcceso === 'nacional') {
        codigoRegion = null; // o el valor que corresponda para nivel nacional
        console.log("Region (nacional):", codigoRegion);
    }

    // Primera carga de datos si tenemos un codigoRegion
    if (codigoRegion !== null) {
        this.loadEstablecimientosData(codigoRegion.toString());
    }
    else
    {}
      //this.loadEstablecimientosData(" ");

    // Suscripción a cambios de ruta
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
    ).subscribe(() => {
        const regionId = Number(this.route.snapshot.paramMap.get('regionId'));
        this.dashboardState.setRegionalView(regionId);
        this.loadRegionDataFromSidebar(regionId);
        this.updatePending = true;
        console.log('Iniciando carga de región:', regionId);

        try {
            // Usamos el regionId de la ruta o el codigoRegion según corresponda
            const regionToLoad = regionId || codigoRegion;
            if (regionToLoad !== null) {
                this.loadEstablecimientosData(regionToLoad.toString());
            }
        } catch (error) {
            console.error('Error cargando región:', error);
        } finally {
            this.updatePending = false;
        }
    });

    // Manejo de la región inicial
    const initialRegionId = Number(this.route.snapshot.paramMap.get('regionId'));
    if (!isNaN(initialRegionId)) {
        this.loadRegionDataFromSidebar(initialRegionId);
        this.dashboardState.setRegionalView(initialRegionId);
        
        // Actualizamos codigoRegion con el valor inicial si es necesario
        if (codigoRegion === null) {
            codigoRegion = initialRegionId;
        }
    }
}
  // Método seguro para obtener datos del mapa
private async fetchMapData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    //console.error('Error obteniendo datos del mapa:', error);
    return null;
  }
}
// Método para actualizar colores en función de la región seleccionada
updateRegionColors(): void {
  if (this.RegionSeleccionada) {
    this.headerColor = this.mapColorsService.getRegionLightColor(this.RegionSeleccionada);
    this.cardColor = this.mapColorsService.getRegionDarkColor(this.RegionSeleccionada);
    //console.log(`Colores para ${this.RegionSeleccionada}: Encabezado - ${this.headerColor}, Tarjetas - ${this.cardColor}`);
  }
}
// Método para manejar el cambio de selección de la región
onRegionSelect(region: string): void {
  this.RegionSeleccionada = region;
  this.updateRegionColors();
}

getImageFilter() {
  // Si estás usando el color del header
  return this.mapColorsService.getImageFilter(this.headerColor);
  
  // O si quieres usar directamente el color de la región
  // return this.mapColorsService.getRegionImageFilter(this.RegionSeleccionada);
}
setRegionColors() {
  this.backgroundColor = this.mapColorsService.getRegionLightColor(this.RegionSeleccionada);
  this.cardColor = this.mapColorsService.getRegionDarkColor(this.RegionSeleccionada);
  
  //console.log('Background color:', this.backgroundColor);
  //console.log('Card color:', this.cardColor);
}
private setupJardinesObserver(): void {
  // Configurar un observador para los cambios en JardinesporRegion
  setInterval(() => {
    if (this.JardinesporRegion.length > 0) {
      // console.log('Jardines cargados:', this.JardinesporRegion.length);
      // console.log('Muestra de coordenadas:', 
      //   this.JardinesporRegion.slice(0, 3).map(jardin => ({
      //     nombre: jardin.nombreJardin,
      //     lat: jardin.latitud,
      //     lon: jardin.longitud,
      //     comuna: jardin.comuna
      //   }))
      // );
    }
  }, 2000); // Revisar cada 2 segundos
}
private setupMapEventListeners(): void {
  if (!this.chart || !this.mapContainer?.nativeElement) return;

  const container = this.mapContainer.nativeElement;
  
  // Reemplaza el contenedor para limpiar eventos previos
  const newContainer = container.cloneNode(true) as HTMLElement;
  container.parentNode?.replaceChild(newContainer, container);

  // Configura el evento `wheel`
  newContainer.addEventListener('wheel', (e: WheelEvent) => {
    e.preventDefault();

    if (!this.chart) return;

    const mapView = (this.chart as any).mapView;
    if (!mapView) return;

    const isZoomIn = e.deltaY < 0; // Determina si el scroll es hacia arriba (aumenta el zoom)
    const zoomFactor = isZoomIn ? 1.2 : 0.8; // Aumenta si es hacia arriba, reduce si es hacia abajo

    requestAnimationFrame(() => {
      try {
        mapView.zoomBy(zoomFactor); // Ajusta el zoom basado en el desplazamiento
      } catch (error) {
        console.error('Error al hacer zoom:', error);
      }
    });
  }, { passive: false });
}

private createMapOptions(mapData: any, seriesData: any[]): Highcharts.Options {
  const jardinesPoints = this.processJardinesPoints();

  // Agrupar jardines por comuna para enumerar
  const jardinesPorComuna = jardinesPoints.reduce((acc: { [key: string]: JardinPoint[] }, jardin) => {
    const comunaKey = jardin.datos.codCom;
    if (!acc[comunaKey]) {
      acc[comunaKey] = [];
    }
    acc[comunaKey].push(jardin);
    return acc;
  }, {});

  // Crear marcadores numerados por comuna
  // Crear marcadores numerados para los jardines
// Crear marcadores numerados para los jardines
let numeroGlobal = 1;
const marcadoresNumerados = Object.values(jardinesPorComuna).flatMap((jardines: JardinPoint[]) => {
  return jardines.map(jardin => ({
    ...jardin,
    numero: numeroGlobal++,
    lat: jardin.lat,
    lon: jardin.lon,
    datos: jardin.datos
  }));
});

  // Asegurarse de que los colores se apliquen correctamente
  const dataWithColors = seriesData.map(item => ({
    ...item,
    color: this.mapColorsService.getCommuneColor(this.RegionSeleccionada, item.name) || '#E6F3FF'
  }));

  return {
    chart: {
      map: mapData,
      backgroundColor: '#ffffff',
      height: '800px',
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
  
                chart.mapView.setView([centerY, centerX], zoom, false);
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
        fontFamily: '"Qsans Semi Bold", "Qsans", sans-serif',
        fontSize: '18px',
        fontWeight: '600'
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
        animation: { duration: 500 },
        states: {
          hover: { brightness: 0.1 },
          inactive: { opacity: 1 }
        }
      },
      map: {
        nullInteraction: true,
        allAreas: true,
        enableMouseTracking: true,
        states: {
          hover: { brightness: 0.1 }
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
        name: 'Números',
        color: 'transparent',
        data: marcadoresNumerados.map(punto => ({
          lat: punto.lat,
          lon: punto.lon,
          numero: punto.numero,
          datos: punto.datos,
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 14,
            fillColor: 'white',
            lineWidth: 2,
            lineColor: this.cardColor || '#666'
          },
          dataLabels: {
            enabled: true,
            format: '{point.numero}',
            style: {
              fontSize: '11px',
              fontWeight: 'bold',
              color: this.cardColor || '#333',
              textOutline: 'none'
            },
            y: 0
          }
        })),
        states: {
          hover: {
            enabled: true,
            halo: { size: 0 }
          }
        },
        tooltip: {
          headerFormat: '',
          pointFormat: `
            <div style="
              background: white;
              padding: 6px;
              border-radius: 4px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
              width: 120px;
              text-align: center;
              border: 1px solid #e2e8f0;
            ">
              <div style="
                background: ${this.cardColor || '#4a5568'};
                margin: -6px -6px 6px -6px;
                padding: 4px;
                border-radius: 3px 3px 0 0;
              ">
                <span style="
                  font-size: 11px;
                  font-weight: 600;
                  color: white;
                ">{point.name}</span>
              </div>
        
              <div style="
                font-size: 16px;
                font-weight: bold;
                color: ${this.cardColor || '#4a5568'};
                margin-bottom: 1px;
              ">{point.value}</div>
              
              <div style="
                font-size: 9px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Total Jardines</div>
            </div>
          `,
          backgroundColor: 'transparent',
          borderWidth: 0,
          shadow: false,
          useHTML: true,
          padding: 0,
          distance: 8
        }
      }
    ],
    credits: {
      enabled: false
    }
  };
}



private processJardinesPoints(): any[] {
  const points = this.JardinesporRegion
    .filter(jardin => {
      const hasCoords = jardin.latitud && jardin.longitud;
      if (!hasCoords) {
        return false;
      }
      return hasCoords;
    })
    .map((jardin, index) => {  // Añadimos el index para la numeración
      try {
        const lat = this.parseCoordinate(jardin.latitud);
        const lon = this.parseCoordinate(jardin.longitud);

        if (isNaN(lat) || isNaN(lon) || !this.isValidCoordinate(lat, lon)) {
          return null;
        }

        return {
          type: 'mappoint',
          name: jardin.nombreJardin,
          lat: lat,
          lon: lon,
          numero: index + 1,  // Agregamos el número
          coordinates: [lon, lat],
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 14,  // Aumentamos el radio para el número
            fillColor: 'white',
            lineWidth: 2,
            lineColor: this.cardColor || '#666'
          },
          dataLabels: {
            enabled: true,
            format: '{point.numero}',  // Mostramos el número
            style: {
              fontSize: '11px',
              fontWeight: 'bold',
              color: this.cardColor || '#333',
              textOutline: 'none'
            },
            y: 0
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

  return points;
}
  // Método corregido para crear el mapa
private async createMap(mapData: any, seriesData: any[]): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      try {
        const container = document.getElementById('map-container');
        if (!container) {
          throw new Error('Contenedor del mapa no encontrado');
        }

        // Asegurar que el contenedor sea visible
        container.style.display = 'block';
        container.style.height = '500px';
        container.style.width = '100%';

        const options = this.createMapOptions(mapData, seriesData);
        
        // Crear el mapa de forma segura
        if (this.chart) {
          this.chart.destroy();
        }
        
        this.chart = Highcharts.mapChart('map-container', options);
        
        if (this.chart) {
          this.setupMapEventListeners();
          this.mapInitialized = true;
        }

        resolve();
      } catch (error) {
        console.error('Error creando mapa:', error);
        resolve();
      }
    });
  });
}

// Método seguro para manejar las series del chart
private updateExistingMap(seriesData: any[]): void {
  if (!this.chart || !this.chart.series) {
    // console.warn('Chart o series no disponibles para actualización');
    return;
  }

  try {
    // Actualizar de forma segura
    this.chart.series.forEach((series, index) => {
      if (index === 0) { // Serie principal del mapa
        series.setData(seriesData, true, { duration: 500 });
      }
    });
  } catch (error) {
    console.error('Error actualizando series del mapa:', error);
  }
}

private async updateMapData(seriesData: any[]): Promise<void> {
  if (!this.chart || !this.chart.series) {
    console.warn('Chart o series no disponibles para actualización');
    return;
  }

  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      try {
        // Verificar que chart.series existe y es un array
        const series = this.chart?.series;
        if (Array.isArray(series)) {
          series.forEach((serie, index) => {
            if (index === 0 && serie && typeof serie.setData === 'function') {
              serie.setData(seriesData, true, { duration: 500 });
            }
          });
        }
        resolve();
      } catch (error) {
        console.error('Error actualizando datos del mapa:', error);
        resolve();
      }
    });
  });
}

getHeaderDotColor(): string {
  if (!this.headerColor) return '#fefbf8'; // color por defecto

  // Convertir el headerColor a un objeto Color para manipularlo
  const rgb = this.headerColor.match(/\d+/g);
  if (!rgb) return '#fefbf8';

  // Crear una versión más oscura del color
  const darkenAmount = 20; // ajusta este valor para hacer el color más o menos oscuro
  const r = Math.max(0, Number(rgb[0]) - darkenAmount);
  const g = Math.max(0, Number(rgb[1]) - darkenAmount);
  const b = Math.max(0, Number(rgb[2]) - darkenAmount);

  return `rgb(${r}, ${g}, ${b})`;
}
private async loadRegionDataFromSidebar(regionId: number) {
  if (this.updatePending) {
    // console.log('Actualización pendiente, esperando...');
    return;
  }

  this.updatePending = true;
  console.log('Iniciando carga de región:', regionId);

  try {
    // Limpiar datos anteriores
    this.jardinesAcumulados = [];
    this.JardinesporRegion = [];
    const regionData = {
      CodigoRegion: regionId,
      NombreRegion: this.getRegionNameById(regionId)
    };
    localStorage.setItem('regionSeleccionada', JSON.stringify(regionData));

    console.log('💾 Datos guardados en localStorage:', {
      datosGuardados: regionData,
      datosRecuperados: JSON.parse(localStorage.getItem('regionSeleccionada') || '{}')
    });
    this.loadEstablecimientosData(regionId.toString());
    // Esperar a que los datos se carguen
    await new Promise<void>((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 10;
      
      const checkData = () => {
        this.loadData(regionId.toString());
        attempts++;
        
        // console.log(`Intento ${attempts} de cargar datos:`, {
        //   acumulados: this.jardinesAcumulados.length,
        //   porRegion: this.JardinesporRegion.length
        // });

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
       primerosJardines: this.JardinesporRegion.slice(0, 12).map(j => ({
         nombre: j.nombreJardin,
         comuna: j.comuna,
         coords: [j.latitud, j.longitud],
         codReg: j.codReg,
         region: j.region,
//         codCom: j.codCom,
         jardin: j.jardin,
         nombreJardin: j.nombreJardin,
         estado: j.estado,
         codMod: j.codMod,
         modalidad: j.modalidad,
//         ubicacion: j.ubicacion,
//         latitud: j.latitud,
//         longitud: j.longitud,
//         calle: j.calle,
//         rbd: j.rbd,
         cniv: j.cniv,
         niv: j.niv,
         gru: j.gru,
         cap: j.cap


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
  // console.log('Colores aplicados:', { headerColor, cardColor });
}


private loadData(region: string, offset: string = ''): void {
  if (!offset) {
    this.jardinesAcumulados = [];
  }

  this.wsAdmSolService.getData(region, offset).subscribe({
    next: (fields) => {
      console.group('🌐 Respuesta del Servicio - Region:', region);
      console.log('XML Raw:', fields);

      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(fields, 'text/xml');
        
        const solmasElement = xmlDoc.getElementsByTagName('SOLMAS')[0];
        const solmas = solmasElement ? solmasElement.textContent?.trim() : '';
        console.log('📑 SOLMAS:', { solmas });

        const soloutElement = xmlDoc.getElementsByTagName('SOLOUT')[0];
        if (!soloutElement) {
          console.error('❌ No se encontró SOLOUT');
          throw new Error('No se encontró el elemento SOLOUT');
        }

        const jsonContent = soloutElement.textContent;
        if (!jsonContent) {
          console.error('❌ SOLOUT está vacío');
          throw new Error('SOLOUT está vacío');
        }

        console.log('📄 JSON Content:', jsonContent);

        const jsonData = JSON.parse(jsonContent);
        const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
        
        console.log('📊 Datos Procesados:', {
          totalRegistros: dataArray.length,
          primerRegistro: dataArray[0],
          ejemploJor_Niv: dataArray[0]?.Jor_Niv,
          codigoRegion: dataArray[0]?.CodReg,
          region: dataArray[0]?.Region
        });

        dataArray.forEach((item, index) => {
          // Log de datos por jardín
          console.group(`🏫 Jardín ${index + 1}/${dataArray.length}`);
          console.log('Datos Básicos:', {
            codigo: item.CodReg,
            region: item.Region,
            comuna: item.Comuna,
            nombre: item.Nombre_Jardin,
            modalidad: item.Modalidad
          });

          let nivelFinal = '';
          let cnivFinal = '';

          if (Array.isArray(item.Jor_Niv) && item.Jor_Niv.length > 0) {
            console.log('📚 Niveles:', {
              total: item.Jor_Niv.length,
              detalle: item.Jor_Niv
            });

            const nivelesPriorizados = item.Jor_Niv.sort((a: any, b: any) => {
              const prioridades: { [key: string]: number } = {
                'SALA CUNA MAYOR': 1,
                'SALA CUNA': 2,
                'HETEROGENEO': 3
              };
              return (prioridades[a.Niv] || 999) - (prioridades[b.Niv] || 999);
            });

            const nivelPrincipal = nivelesPriorizados[0];
            nivelFinal = nivelPrincipal.Niv || '';
            cnivFinal = nivelPrincipal.Cniv || '';

            console.log('📊 Niveles Priorizados:', {
              todos: nivelesPriorizados.map((n: any) => n.Niv),
              seleccionado: nivelFinal
            });
          } else {
            console.log('⚠️ Sin información de niveles');
          }

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
            cjor: item.Jor_Niv?.[0]?.Cjor || '',
            jor: item.Jor_Niv?.[0]?.Jor || '',
            cniv: cnivFinal,
            niv: nivelFinal,
            gru: item.Jor_Niv?.[0]?.Gru || '',
            cap: item.Jor_Niv?.[0]?.Cap || ''
          };

          console.log('✅ Jardín Procesado:', jardin);
          console.groupEnd();

          this.jardinesAcumulados.push(jardin);
        });

        console.log('📈 Resumen Final:', {
          totalJardines: this.jardinesAcumulados.length,
          regiones: [...new Set(this.jardinesAcumulados.map(j => j.region))],
          comunas: [...new Set(this.jardinesAcumulados.map(j => j.comuna))],
          modalidades: [...new Set(this.jardinesAcumulados.map(j => j.modalidad))]
        });

        console.groupEnd();
        if (solmas && solmas !== '') {
          this.loadData(region, solmas);
        } else {
          this.JardinesporRegion = [...this.jardinesAcumulados];
          console.log('Total jardines cargados:', this.JardinesporRegion.length);
          console.log('Muestra de niveles:', this.JardinesporRegion.slice(0, 5).map(j => ({
            nombre: j.nombreJardin,
            modalidad: j.modalidad,
            nivel: j.niv
          })));
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




private async loadRegionData(regionId: number): Promise<void> {
  try {
      // console.log(`Iniciando carga de datos para la región con ID: ${regionId}`);

      // Cargar los datos de jardines y esperar hasta que `JardinesporRegion` se haya llenado
      await new Promise<void>((resolve, reject) => {
          this.loadData(regionId.toString());

          const checkInterval = setInterval(() => {
              if (this.JardinesporRegion.length > 0) {
                  // console.log(`✅ Datos de jardines cargados: ${this.JardinesporRegion.length} jardines en total.`);
                  clearInterval(checkInterval);
                  resolve();
              }
          }, 100);

          setTimeout(() => {
              clearInterval(checkInterval);
              if (this.JardinesporRegion.length === 0) {
                  console.warn('⚠️ Tiempo de espera agotado. No se han cargado jardines.');
                  reject(new Error('Timeout: No se cargaron datos de jardines en el tiempo esperado.'));
              } else {
                  resolve();
              }
          }, 10000); // Espera máximo de 10 segundos
      });

      // Cargar y procesar los datos del mapa
      const mapDataUrl = this.getGeoJsonUrl(regionId);
      // console.log(`Cargando datos del mapa desde: ${mapDataUrl}`);

      const response = await fetch(mapDataUrl);
      if (!response.ok) {
          throw new Error(`Error al obtener los datos del mapa. Código de estado HTTP: ${response.status}`);
      }

      const mapData = await response.json();
      //console.log('✅ Datos del mapa cargados con éxito.');

      // Procesar y renderizar el mapa
      const seriesData = this.processMapData(mapData);
      //console.log('Procesando y renderizando el mapa...');
      await this.renderMap(mapData, seriesData);
      //console.log('✅ Mapa renderizado exitosamente para la región:', this.RegionSeleccionada);

  } catch (error) {
      console.error('❌ Error al cargar los datos de la región:', error);
  }
}


// Método corregido para procesar datos del mapa
private processMapData(mapData: any) {
  if (!mapData || !mapData.features) {
    console.warn('Datos del mapa no válidos');
    return [];
  }
  // Función para normalizar nombres de comunas (mejorada)
  const normalizarNombre = (nombre: string): string => {
    return nombre
      .trim()
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")  // Normalizar espacios múltiples
      .replace(/\-/g, " ");  // Reemplazar guiones por espacios
  };
  const jardinesPorComuna = this.JardinesporRegion.reduce((acc, jardin) => {
    const comunaNormalizada = normalizarNombre(jardin.comuna);
    acc[comunaNormalizada] = (acc[comunaNormalizada] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

// Debug: mostrar mapeo de nombres
console.log('Nombres en el mapa:', mapData.features.map((f: any) => 
  f.properties?.['Comuna']
));
  // console.log('Debug O\'Higgins:', {
  //   regionSeleccionada: this.RegionSeleccionada,
  //   normalizedRegion: this.RegionSeleccionada.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
  //   totalFeatures: mapData.features.length,
  //   primeraComuna: mapData.features[0]?.properties?.['Comuna']
  // });
  // console.log('Procesando región:', this.RegionSeleccionada);
  this.mapColorsService.logRegionInfo(this.RegionSeleccionada);

  return mapData.features.map((f: any) => {
    try {
      const nombreComuna = f.properties?.['Comuna'] || '';
      const nombreComunaNormalizado = normalizarNombre(nombreComuna);
      const color = this.mapColorsService.getCommuneColor(this.RegionSeleccionada, nombreComuna);
      
      // Intentar encontrar la coincidencia más cercana
      const cantidadJardines = jardinesPorComuna[nombreComunaNormalizado] || 
                              jardinesPorComuna[nombreComuna.toUpperCase()] || 
                              0;

      console.log(`Comuna ${nombreComuna} (${nombreComunaNormalizado}): ${cantidadJardines} jardines`);

      return {
        'hc-key': nombreComuna,
        name: nombreComuna,
        cantidadJardines: cantidadJardines,
        codigoComuna: f.properties?.['CodCom'] || '',
        value: cantidadJardines,
        color: color || '#E6F3FF',
        properties: {
          ...f.properties,
          cantidadJardines: cantidadJardines
        }
      };
    } catch (error) {
      console.error('Error procesando feature del mapa:', error);
      return null;
    }
  }).filter((item: null) => item !== null);
}

private getTooltipConfig(): Highcharts.TooltipOptions {
    return {
      enabled: true,
      useHTML: true,
      headerFormat: '',
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadow: false,
      style: {
        padding: '0px'
      },
      pointFormat: `
        <div class="custom-tooltip" style="
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          min-width: 250px;
          border: 1px solid #e0e6ed;
          font-family: 'Arial', sans-serif;
        ">
          <div class="tooltip-header" style="
            background: #f8fafc;
            padding: 12px 15px;
            border-bottom: 1px solid #e0e6ed;
            border-radius: 8px 8px 0 0;
            display: flex;
            align-items: center;
            gap: 10px;
          ">
            <div class="icon" style="
              background: #eef2ff;
              padding: 8px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Techo rojo con patrón de rayas -->
                <path d="M2 12 L12 2 L22 12" fill="#FF9B9B" stroke="none"/>
                <g fill="#FF8B8B" opacity="0.5">
                  <path d="M4 10 L5 9 L5.5 9.5 L4.5 10.5 Z"/>
                  <path d="M6 8 L7 7 L7.5 7.5 L6.5 8.5 Z"/>
                  <path d="M8 6 L9 5 L9.5 5.5 L8.5 6.5 Z"/>
                  <path d="M10 4 L11 3 L11.5 3.5 L10.5 4.5 Z"/>
                  <path d="M12 6 L13 5 L13.5 5.5 L12.5 6.5 Z"/>
                  <path d="M14 8 L15 7 L15.5 7.5 L14.5 8.5 Z"/>
                  <path d="M16 10 L17 9 L17.5 9.5 L16.5 10.5 Z"/>
                </g>
  
                <!-- Pared verde con patrón de rayas -->
                <rect x="4" y="12" width="16" height="10" fill="#96DEB3"/>
                <g fill="#86CEA3" opacity="0.5">
                  <path d="M6 14 L7 13 L7.5 13.5 L6.5 14.5 Z"/>
                  <path d="M8 16 L9 15 L9.5 15.5 L8.5 16.5 Z"/>
                  <path d="M10 18 L11 17 L11.5 17.5 L10.5 18.5 Z"/>
                  <path d="M12 20 L13 19 L13.5 19.5 L12.5 20.5 Z"/>
                  <path d="M14 18 L15 17 L15.5 17.5 L14.5 18.5 Z"/>
                  <path d="M16 16 L17 15 L17.5 15.5 L16.5 16.5 Z"/>
                </g>
  
                <!-- Ventana triangular azul -->
                <path d="M11 8 L12 6 L13 8 Z" fill="#6B8AF7"/>
  
                <!-- Arco morado con patrón de rayas -->
                <path d="M6 18 C6 14 18 14 18 18" fill="#D8BFFF" stroke="none"/>
                <g fill="#C4A7FF" opacity="0.5">
                  <path d="M8 16 L9 15.5 L9.5 16 L8.5 16.5 Z"/>
                  <path d="M10 15.5 L11 15 L11.5 15.5 L10.5 16 Z"/>
                  <path d="M12 15 L13 14.5 L13.5 15 L12.5 15.5 Z"/>
                  <path d="M14 15.5 L15 15 L15.5 15.5 L14.5 16 Z"/>
                  <path d="M16 16 L17 15.5 L17.5 16 L16.5 16.5 Z"/>
                </g>
              </svg>
            </div>
            <span style="
              font-weight: 600;
              color: #1e293b;
              font-size: 15px;
            ">{point.name}</span>
          </div>
          
          <div class="tooltip-body" style="padding: 15px;">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            ">
              <span style="
                color: #64748b;
                font-size: 13px;
              ">Código Comuna</span>
              <span style="
                color: #1e293b;
                font-weight: 500;
                font-size: 13px;
              ">{point.codigoComuna}</span>
            </div>
            
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
              <span style="
                color: #64748b;
                font-size: 13px;
              ">Total Jardines</span>
              <span style="
                background: #eef2ff;
                color: #4361ee;
                padding: 4px 8px;
                border-radius: 4px;
                font-weight: 600;
                font-size: 13px;
              ">{point.value}</span>
            </div>
          </div>
        </div>
      `,
      positioner: function(labelWidth, labelHeight, point) {
        const chart = this.chart;
        let x = point.plotX + chart.plotLeft;
        let y = point.plotY + chart.plotTop;
        
        if (x + labelWidth > chart.plotWidth) {
          x = point.plotX + chart.plotLeft - labelWidth;
        }
        if (y + labelHeight > chart.plotHeight) {
          y = point.plotY + chart.plotTop - labelHeight;
        }
        
        return {
          x: x,
          y: y
        };
      }
    };
  }
  private isValidCoordinate(lat: number, lon: number): boolean {
    // Validar rango de coordenadas para Chile
    const isValidLat = lat >= -56 && lat <= -17; // Rango aproximado para Chile
    const isValidLon = lon >= -76 && lon <= -66; // Rango aproximado para Chile
  
    if (!isValidLat || !isValidLon) {
      // console.warn('Coordenada fuera de rango:', { lat, lon });
    }
  
    return isValidLat && isValidLon;
  }

  // Método para debugging
private logCoordinateStatus(): void {
  const jardines = this.JardinesporRegion;
  // console.log('Análisis de coordenadas:', {
  //   total: jardines.length,
  //   conLatitud: jardines.filter(j => j.latitud).length,
  //   conLongitud: jardines.filter(j => j.longitud).length,
  //   ejemplos: jardines.slice(0, 5).map(j => ({
  //     nombre: j.nombreJardin,
  //     latitud: j.latitud,
  //     longitud: j.longitud
  //   }))
  // });
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

  private async renderMap(mapData: any, seriesData: any[]): Promise<void> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        try {
          // Procesar puntos de jardines con coordenadas válidas
          const jardinesPoints = this.JardinesporRegion
            .filter(jardin => jardin.latitud && jardin.longitud)
            .map(jardin => {
              const lat = this.parseCoordinate(jardin.latitud);
              const lon = this.parseCoordinate(jardin.longitud);
  
              return {
                type: 'mappoint',
                name: '',
                geometry: { type: 'Point', coordinates: [lon, lat] },
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
                  calle: jardin.calle,
                  codCom: jardin.codCom,
                  jardin: jardin.jardin,
                  modalidad: jardin.modalidad,
                  ubicacion: jardin.ubicacion,
                  director: jardin.director,
                  estado: jardin.estado
                }
              };
            })
            .filter(point => {
              const coords = point.geometry.coordinates;
              return coords && Array.isArray(coords) && coords.length === 2 && 
                     !isNaN(coords[0]) && !isNaN(coords[1]) &&
                     coords[0] !== 0 && coords[1] !== 0;
            });
  
          // Asignar colores a seriesData usando el servicio de colores
          const dataWithColors = seriesData.map(item => ({
            ...item,
            color: this.mapColorsService.getCommuneColor(this.RegionSeleccionada, item.name) || '#E6F3FF'
          }));
  
          // Configuración del mapa con tooltip enriquecido
          const mapOptions: Highcharts.Options = {
            chart: {
              map: mapData,
              backgroundColor: '#ffffff',
              height: '500px',
              style: { fontFamily: 'Arial, sans-serif' },
              animation: { duration: 1000 }
            },
            title: {
              text: 'Mapa de ' + this.RegionSeleccionada,
              style: { fontSize: '18px', fontWeight: 'bold' }
            },
            
            mapView: { projection: { name: 'WebMercator' } },
            mapNavigation: {
              enabled: true,
              enableButtons: true,
              enableDoubleClickZoom: false,
              enableMouseWheelZoom: true,
              enableTouchZoom: true
            },
            colorAxis: [{
              min: 0,
              max: 100,
              minColor: '#E6F3FF',
              maxColor: '#1565C0',
              showInLegend: true
            }],
            legend: {
              enabled: true,
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical',
              title: { text: 'Valores' }
            },
            tooltip: {
              useHTML: true,
              formatter: function(this: Highcharts.TooltipFormatterContextObject): string {
                const point = this.point as any;
                if (point.series.type === 'mappoint') {
                  return `
                    <div style="
                      background: linear-gradient(145deg, white, #f8fafc);
                      padding: 15px;
                      border-radius: 12px;
                      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                      min-width: 300px;
                      border: 2px solid ${ '#e0e0e0'};
                    ">
                      <div style="
                        background: ${'#4a5568'};
                        margin: -15px -15px 15px -15px;
                        padding: 15px;
                        border-radius: 10px 10px 0 0;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                      ">
                        <div style="
                          width: 32px;
                          height: 32px;
                          background-image: url('assets/images/Integra-Palmundo-32.png');
                          background-size: cover;
                          border: 2px solid rgba(255,255,255,0.3);
                          border-radius: 6px;
                        "></div>
                        <h4 style="
                          margin: 0;
                          color: white;
                          font-size: 16px;
                          font-weight: bold;
                          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                        ">${point.datos.nombreJardin || ''}</h4>
                      </div>
            
                      <div style="display: grid; gap: 8px;">
                        <div class="info-row" style="
                          display: flex;
                          justify-content: space-between;
                          padding: 10px;
                          background: #f8fafc;
                          border-radius: 6px;
                          border: 1px solid #e2e8f0;
                        ">
                          <span style="color: #64748b;">Dirección</span>
                          <strong>${point.datos.calle || ''}</strong>
                        </div>
            
                        <div class="info-row" style="
                          display: flex;
                          justify-content: space-between;
                          padding: 10px;
                          background: white;
                          border-radius: 6px;
                          border: 1px solid #e2e8f0;
                        ">
                          <span style="color: #64748b;">Comuna</span>
                          <strong style="color: ${"#242424"}">${point.datos.codCom || ''}</strong>
                        </div>
            
                        <div class="info-row" style="
                          display: flex;
                          justify-content: space-between;
                          padding: 10px;
                          background: #f8fafc;
                          border-radius: 6px;
                          border: 1px solid #e2e8f0;
                        ">
                          <span style="color: #64748b;">Director</span>
                          <strong>${point.datos.director || ''}</strong>
                        </div>
            
                        <div class="info-row" style="
                          display: flex;
                          justify-content: space-between;
                          padding: 10px;
                          background: white;
                          border-radius: 6px;
                          border: 1px solid #e2e8f0;
                        ">
                          <span style="color: #64748b;">Código Jardín</span>
                          <strong>${point.datos.jardin || ''}</strong>
                        </div>
            
                        <div class="info-row" style="
                          display: flex;
                          justify-content: space-between;
                          padding: 10px;
                          background: #f8fafc;
                          border-radius: 6px;
                          border: 1px solid #e2e8f0;
                        ">
                          <span style="color: #64748b;">Modalidad</span>
                          <strong style="color: ${"#242424"}">${point.datos.modalidad || ''}</strong>
                        </div>
            
                        <div class="info-row" style="
                          display: flex;
                          justify-content: space-between;
                          padding: 10px;
                          background: white;
                          border-radius: 6px;
                          border: 1px solid #e2e8f0;
                        ">
                          <span style="color: #64748b;">Estado</span>
                          <strong>${point.datos.estado || ''}</strong>
                        </div>
            
                        <div class="info-row" style="
                          display: flex;
                          justify-content: space-between;
                          padding: 10px;
                          background: #f8fafc;
                          border-radius: 6px;
                          border: 1px solid #e2e8f0;
                        ">
                          <span style="color: #64748b;">Ubicación</span>
                          <strong>${point.datos.ubicacion || ''}</strong>
                        </div>
                      </div>
                    </div>
                  `;
                } else {
                  return `
                    <div style="
                      background: linear-gradient(145deg, white, #f8fafc);
                      padding: 15px;
                      border-radius: 12px;
                      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                      min-width: 220px;
                      border: 2px solid ${'#e0e0e0'};
                    ">
                      <div style="
                        background: ${ '#4a5568'};
                        margin: -15px -15px 15px -15px;
                        padding: 12px;
                        border-radius: 10px 10px 0 0;
                        text-align: center;
                      ">
                        <h4 style="
                          margin: 0;
                          color: white;
                          font-size: 16px;
                          font-weight: bold;
                          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                        ">${point.name || ''}</h4>
                      </div>
            
                      <div style="
                        background: #f8fafc;
                        padding: 12px;
                        border-radius: 8px;
                        text-align: center;
                      ">
                        <div style="
                          font-size: 32px;
                          font-weight: bold;
                          color: ${ '#4a5568'};
                          margin-bottom: 4px;
                        ">${point.value || 0}</div>
                        <div style="
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 500;
                          text-transform: uppercase;
                          letter-spacing: 0.5px;
                        ">Total Jardines</div>
                      </div>
                    </div>
                  `;
                }
              }
            }
            ,
            series: [
              {
                type: 'map',
                name: 'Comunas',
                data: dataWithColors,
                joinBy: ['Comuna', 'hc-key']
              },
              {
                type: 'mappoint',
                name: 'Jardines',
                data: jardinesPoints,
                tooltip: { headerFormat: '' }
              }
            ],
            credits: { enabled: false }
          };
  
          // Inicialización del contenedor del mapa y creación del mapa
          const container = document.getElementById('map-container');
          if (container) {
            if (this.chart) this.chart.destroy(); // Elimina el mapa anterior
  
            container.style.height = '500px';
            container.style.width = '100%';
  
            this.chart = Highcharts.mapChart('map-container', mapOptions);
  
            // Manejo de zoom en eventos de desplazamiento del mouse
            const handleWheel = (e: WheelEvent) => {
              e.preventDefault();
              const chartInstance = this.chart as any;
              if (chartInstance?.mapView) {
                const zoomDelta = e.deltaY > 0 ? 0.8 : 1.2;
                requestAnimationFrame(() => {
                  try {
                    chartInstance.mapView.zoomBy(zoomDelta);
                  } catch (error) {
                    console.error('Error al hacer zoom:', error);
                  }
                });
              }
            };
            
            container.removeEventListener('wheel', handleWheel);
            container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
            resolve();
          } else {
            console.error('Contenedor del mapa no encontrado');
            resolve();
          }
        } catch (error) {
          console.error('Error al renderizar el mapa:', error);
          resolve();
        }
      });
    });
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

  private async loadMapData(regionId: number): Promise<void> {
    // console.log('Cargando datos del mapa para la región:', regionId);
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

  private initializeMap(): void {
    console.log('Inicializando mapa para la región:', this.RegionSeleccionada);
    
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
            fontFamily: '"Qsans Semi Bold", "Qsans", sans-serif',
            fontSize: '18px',
            fontWeight: '600'
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
          headerFormat: '',
          pointFormat: `
            <div style="
              background: white;
              padding: 15px;
              border-radius: 10px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.15);
              min-width: 250px;
              border: 2px solid ${this.cardColor || '#e0e0e0'};
            ">
              <div style="
                background: ${this.cardColor || '#4a5568'};
                margin: -15px -15px 15px -15px;
                padding: 12px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              ">
                <span style="
                  font-size: 18px;
                  font-weight: bold;
                  color: white;
                  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                ">{point.name}</span>
              </div>
              
              <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                background: #f8fafc;
                border-radius: 8px;
              ">
                <div style="text-align: center;">
                  <div style="
                    font-size: 32px;
                    font-weight: bold;
                    color: ${this.cardColor || '#4a5568'};
                    margin-bottom: 5px;
                  ">{point.cantidadJardines}</div>
                  <div style="
                    font-size: 14px;
                    color: #64748b;
                    font-weight: 500;
                    text-transform: uppercase;
                  ">Total Jardines</div>
                </div>
              </div>
            </div>
          `,
          backgroundColor: 'transparent',
          borderWidth: 0,
          shadow: false,
          useHTML: true,
          style: {
            fontSize: '14px'
          },
          padding: 0,
          distance: 20
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
          fontFamily: '"Qsans Semi Bold", "Qsans", sans-serif',
          fontSize: '18px',
          fontWeight: '600'
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

  DistribuirEnColumnas(numColumnas: number = 4): ItemLista[][] {
    // Filtrar jardines duplicados en `JardinesporRegion`
    const uniqueJardines = this.JardinesporRegion.filter(
        (jardin, index, self) =>
            index === self.findIndex((j) => j.nombreJardin === jardin.nombreJardin && j.comuna === jardin.comuna)
    );

    const listaCompleta: ItemLista[] = [];
    const jardinesAgrupados = this.getJardinesAgrupados(uniqueJardines);
    const comunasOrdenadas = Array.from(jardinesAgrupados.entries())
        .sort((a, b) => a[0].localeCompare(b[0]));

    for (const [comuna, jardines] of comunasOrdenadas) {
        // Agregar comuna
        listaCompleta.push({
            tipo: 'comuna',
            nombre: comuna,
            modalidad: '' // Campo vacío para cumplir con la estructura
        });

        // Agregar establecimientos únicos, ordenados alfabéticamente
        const uniqueEstablecimientos = jardines.filter((jardin, index, self) =>
            index === self.findIndex((j) => j.nombreJardin === jardin.nombreJardin)
        );

        uniqueEstablecimientos
        .sort((a, b) => a.nombreJardin.localeCompare(b.nombreJardin))
        .forEach(jardin => {
            listaCompleta.push({
                tipo: 'establecimiento',
                nombre: jardin.nombreJardin,
                modalidad: jardin.modalidad,
                codigo: jardin.jardin,
                estado: jardin.estado,
                ubicacion: jardin.ubicacion,
                nivel: jardin.niv  // Añadir el nivel
            });
        });
    }

    // Distribuir en columnas de manera uniforme
    const itemsPorColumna = Math.ceil(listaCompleta.length / numColumnas);
    const columnas: ItemLista[][] = [];

    for (let i = 0; i < numColumnas; i++) {
        const inicio = i * itemsPorColumna;
        const fin = Math.min(inicio + itemsPorColumna, listaCompleta.length);
        columnas.push(listaCompleta.slice(inicio, fin));
    }

    return columnas;
}

getEstablecimientoColor(modalidad: string, nivel: string): string {
  const baseColor = this.cardColor; // El color base de la región
  const tipo = this.getTipoEstablecimiento(modalidad, nivel);
  
  // Convertir el color base a HSL para poder manipular la luminosidad
  const rgb = this.hexToRgb(baseColor);
  const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Ajustar la luminosidad según el tipo de establecimiento
  switch (tipo) {
    case 'S.C y J.I':
      return this.adjustBrightness(baseColor, 1); // Color original
    case 'S.C':
      return this.adjustBrightness(baseColor, 0.85); // Un poco más oscuro
    case 'J.I':
      return this.adjustBrightness(baseColor, 0.7); // Más oscuro aún
    default:
      return this.adjustBrightness(baseColor, 0.55); // El más oscuro
  }
}

// Métodos auxiliares para el manejo de colores
private hexToRgb(hex: string): { r: number, g: number, b: number } {
  // Remover el # si existe
  hex = hex.replace(/^#/, '');
  
  // Parsear los componentes
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

private rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  return { h, s, l };
}

private adjustBrightness(color: string, factor: number): string {
  const rgb = this.hexToRgb(color);
  
  return `rgb(${Math.round(rgb.r * factor)}, ${Math.round(rgb.g * factor)}, ${Math.round(rgb.b * factor)})`;
}
getTipoEstablecimiento(modalidad: string, nivel: string): string {
  //console.log("*modalidad", modalidad, "nivel:", nivel);
  const modalidadUpper = modalidad?.toUpperCase() || '';
  const nivelUpper = nivel?.toUpperCase() || '';

  // Caso 1: S.C y J.I con Sala Cuna Mayor
  if (modalidadUpper.includes('JARDÍN INFANTIL') && nivelUpper.includes('SALA CUNA MAYOR')) {
      return 'S.C y J.I';
  }

  // Caso 2: S.C y J.I con SALA CUNA
  if (modalidadUpper.includes('JARDÍN INFANTIL') && nivelUpper.includes('SALA CUNA')) {
      return 'S.C y J.I';
  }

  // Caso 3: S.C con CENTRO PENITENCIARIO
  if (modalidadUpper.includes('CENTRO PENITENCIARIO') && nivelUpper.includes('SALA CUNA')) {
      return 'S.C';
  }

  // Caso 4: S.C con CONVENIO y SALA CUNA MAYOR
  if (modalidadUpper.includes('CONVENIO') && nivelUpper.includes('SALA CUNA MAYOR')) {
      return 'S.C';
  }

  // Caso 5: J.I con HETEROGENEO
  if (modalidadUpper.includes('JARDÍN INFANTIL') && nivelUpper.includes('HETEROGENEO')) {
      return 'J.I';
  }

  // Caso por defecto
  return 'OT';
}

getJardinesAgrupadosEnColumnas(): ComunaGroup[] {
  // Primero agrupamos por comuna
  console.log('Debug: JardinesporRegion contiene', this.JardinesporRegion.length, 'jardines.');
  // Verifica si el array está vacío
  if (this.JardinesporRegion.length === 0) {
      console.warn('⚠️ Atención: JardinesporRegion está vacío.');
      return [];
  }

  const jardinesAgrupados = new Map<string, Jardin[]>();

  this.JardinesporRegion.forEach(jardin => {
      if (!jardinesAgrupados.has(jardin.comuna)) {
          jardinesAgrupados.set(jardin.comuna, []);
      }
      jardinesAgrupados.get(jardin.comuna)?.push(jardin);
  });

  // Convertimos el Map a un array de objetos con la estructura deseada
  const comunasArray: ComunaGroup[] = Array.from(jardinesAgrupados.entries())
      .map(([comuna, jardines]) => ({
          nombreComuna: comuna,
          establecimientos: jardines.sort((a, b) => 
              a.nombreJardin.localeCompare(b.nombreJardin)
          )
      }))
      .sort((a, b) => a.nombreComuna.localeCompare(b.nombreComuna));

  // Log para verificar el total de jardines por comuna
  comunasArray.forEach(comunaGroup => {
      const totalJardines = comunaGroup.establecimientos.length;
      console.log(`***Comuna: ${comunaGroup.nombreComuna}, Total Jardines: ${totalJardines}`);
      
      // Verificar y registrar comunas con 0 jardines
      if (totalJardines === 0) {
          console.warn(`⚠️ Atención: La comuna "${comunaGroup.nombreComuna}" tiene 0 jardines.`);
      }
  });

  return comunasArray;
}


sortEstablecimientos(establecimientos: Jardin[]): Jardin[] {
  return establecimientos.sort((a, b) => {
      console.log("sortEstablecimientos a", a.modalidad, a.niv);
      console.log("sortEstablecimientos b", b.modalidad, b.niv);
      const tipoA = this.getTipoEstablecimiento(a.modalidad, a.niv);
      const tipoB = this.getTipoEstablecimiento(b.modalidad, b.niv);
      if (tipoA !== tipoB) {
          return tipoA.localeCompare(tipoB);
      }
      return a.nombreJardin.localeCompare(b.nombreJardin);
  });
}
// Añade este método a tu clase CustomDashboardComponent
getJardinesAgrupados(jardines: Jardin[]): Map<string, Jardin[]> {
  const jardinesAgrupados = new Map<string, Jardin[]>();

  // Agrupar por comuna y eliminar duplicados por nombre de jardín dentro de cada comuna
  jardines.forEach(jardin => {
      if (!jardinesAgrupados.has(jardin.comuna)) {
          jardinesAgrupados.set(jardin.comuna, []);
      }
      const comunaJardines = jardinesAgrupados.get(jardin.comuna);
      const exists = comunaJardines?.some((j) => j.nombreJardin === jardin.nombreJardin);

      if (!exists) {
          comunaJardines?.push(jardin);
      }
  });

  return new Map([...jardinesAgrupados.entries()].sort());
}


// También puedes agregar este método helper si necesitas formatear la modalidad
getModalidadAbreviada(modalidad: string): string {
  // Validar que modalidad no sea null o undefined
  if (!modalidad) return 'OT';
  
  // Normalizar el texto: remover acentos y convertir a mayúsculas
  const modalidadNormalizada = modalidad
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  
  //console.log("Modalidad normalizada:", modalidadNormalizada);

  // Hacer las comparaciones con texto sin acentos
  if (modalidadNormalizada.includes('JARDIN INFANTIL')) return 'JI';
  if (modalidadNormalizada.includes('SALA CUNA')) return 'SC';
  if (modalidadNormalizada.includes('FAMILIAR')) return 'PF';
  if (modalidadNormalizada.includes('LABORAL')) return 'PL';
  if (modalidadNormalizada.includes('PMI')) return 'PMI';
  if (modalidadNormalizada.includes('ALTERNATIVO')) return 'PA';
  if (modalidadNormalizada.includes('COMUNICACIONAL')) return 'PC';

  return 'OT';
}  getGeoJsonUrl(regionId: number): string {
    const regionGeoJsonUrls: { [key: number]: string } = {
      1: '/assets/map/clta.geo.json',
      2: '/assets/map/clan.geo.json',
      3: '/assets/map/clat.geo.json',
      4: '/assets/map/clco.geo.json',
      5: '/assets/map/clvs.geo.json',
      601: '/assets/map/clrm_nor_oriente.geo.json',
      602:'/assets/map/clrm_ruralnor_poniente.geo.json',
      603:'/assets/map/clrm_sur_oriente.geo.json',
      6:'/assets/map/clog.geo.json',
      7:'/assets/map/clml.geo.json',
      8:'/assets/map/clbi.geo.json',
      9:'/assets/map/clar.geo.json',
      14:'/assets/map/cllr.geo.json',
      10:'/assets/map/clll.geo.json',
      12:'/assets/map/clay.geo.json',
      13:'/assets/map/clma.geo.json',
      15:'/assets/map/clap.geo.json',
      //14:'/assets/map/cldr.geo.json',
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
      6:'Ohiggins',
      7:'Maule',
      8:'Biobio',
      9:'Araucania',
      
      10:'Los Lagos',
      //11:'Los Rios',
      12:'Aysén',
      13:'Magallanes',
      14:'Los Ríos',
      15:'Arica y Parinacota',
      16:'Ñuble'
    };
  
    return regionNames[regionId] || 'Desconocida';
  }
  // Add above updateRegion() and below loadData()
private countJardinesPorModalidad(): ModalidadCount[] {
  const counts = new Map<string, number>();
  
  this.JardinesporRegion.forEach(jardin => {
    const modalidad = jardin.modalidad || 'Sin Modalidad';
    counts.set(modalidad, (counts.get(modalidad) || 0) + 1);
  });

  return Array.from(counts.entries()).map(([modalidad, count]) => ({
    modalidad,
    count
  }));
}

private updateTarjetasSuperiores(): void {
  const modalidadCounts = this.countJardinesPorModalidad();
  
  this.tarjetasSuperiores = [
    { valor: this.JardinesporRegion.length, titulo: 'Total Establecimientos', icon: faHome },
    { valor: modalidadCounts.find(m => m.modalidad.includes('SALA CUNA Y JARDÍN'))?.count || 0, titulo: 'Salas Cuna y Jardines Infantiles', icon: faBaby },
    { valor: modalidadCounts.find(m => m.modalidad === 'JARDÍN INFANTIL')?.count || 0, titulo: 'Jardines Infantiles', icon: faBed },
    { valor: modalidadCounts.find(m => m.modalidad === 'SALA CUNA')?.count || 0, titulo: 'Salas Cuna', icon: faShoppingCart },
    { valor: modalidadCounts.filter(m => 
      m.modalidad.includes('ALTERNATIVO') || 
      m.modalidad.includes('FAMILIAR') || 
      m.modalidad.includes('LABORAL') ||
      m.modalidad === 'CONVENIO')
      .reduce((acc, curr) => acc + curr.count, 0), 
      titulo: 'Modalidad No convencional', 
      icon: faChild 
    },
    { valor: modalidadCounts.find(m => m.modalidad.includes('SOBRE RUEDAS'))?.count || 0, titulo: 'Jardines Sobre Ruedas', icon: faBus }
  ];
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    console.log('Componente destruido');
  }
  
}


@NgModule({
  declarations: [CustomDashboardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,   
    RouterModule,
    ElemButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomDashboardModule {}