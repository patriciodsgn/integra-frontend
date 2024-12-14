import { inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChild, faBus, faBed, faPeopleRoof, faCalendar, faBaby, faGlobe, faUsers, 
         faGraduationCap, faPeopleArrows, faShieldAlt, faBuilding, faTree, faShoppingCart,
         faChalkboardTeacher, faDesktop, faBuildingCircleXmark ,
         faHome} from '@fortawesome/free-solid-svg-icons';
import { WS_ADM_SOLService } from 'src/app/services/WS_ADM_SOL.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';
import tarjetasSuperioresData from '../../../assets/tarjetas-superiores.json';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { DashboardStateService } from '../../core/services/dashboard-state.service';
import { DpgrService } from '../../services/dpgr.services';
import { RegionService } from '../../services/region.service';
import { RegionMapModule } from '../mapa-chile/region-map.module';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { SeriesOptionsType } from 'highcharts';
import { PresupuestoService } from '../../services/presupuesto.service';
import Highcharts3D from 'highcharts/highcharts-3d'
import { 
  PresupuestoParams, 
  ApiResponse, 
  PresupuestoEjecutado 
} from '../../models/presupuesto-data.model';
import { log } from 'console';
import { ButtonStateService } from '../../button-state.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
Highcharts3D(Highcharts);
interface TarjetaSuperior {
  valor: number;
  titulo: string;
  icon: IconProp;
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

@Component({
  selector: 'app-custom-dashboard-inicial',
  templateUrl: './custom-dashboard-inicial.component.html',
  styleUrls: ['./custom-dashboard-inicial.component.css']
})
export class CustomDashboardInicialComponent implements OnInit, OnDestroy {
  JardinesporRegion: Jardin[] = [];
[x: string]: any;
  // Suscripciones
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
    { eb_icon: 'trending_up', eb_title: 'Evolución', eb_subtitle: 'Costos Matrícula', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/costos/evolucion' },
    // { eb_icon: 'hourglass_empty', eb_title: 'Permanencia', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/costos/' },
    // { eb_icon: 'event_busy', eb_title: 'Ausentismo', eb_subtitle: 'Ejemplo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/costos/' },
    // { eb_icon: 'groups', eb_title: 'Planta Contratada', eb_subtitle: 'Ejemplo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/costos/' },
  ];
  presupuestoTotal: number = 0;
  ejecutadoTotal: number = 0;
  private dataSubscription: Subscription | undefined;
  private dataSubscriptionEp: Subscription | undefined;
  private presupuestoSubscription: Subscription | undefined;
  presupuestoData: PresupuestoEjecutado[] = [];
  
  currentYear = new Date().getFullYear();
  // Datos de jardines
 

  // Datos simulados
  ejecucionData: any[] = [];
  totalEjecutado = 0;
  totalVigente = 0;
  gastosEjecutados = 0;
  saldoPorGastar = 0;

  // Estado y datos
  isExpanded = false;
  jardinData: { region: string; jardin: string }[] = [];
  public processedData: any[] = [];
  faCalendar = faCalendar;
  public fechaActual: string;

  // Opciones de gráficos
  chartOptionsBar: Highcharts.Options = {
    credits: { enabled: false },
    chart: {
      type: 'bar',
      borderColor: '#333',
      borderWidth: 0,
      backgroundColor: '#f9f9f9'
    },
    // ... resto de la configuración del gráfico de barras
  };

  chartOptionsPie: Highcharts.Options = {
    chart: {
      type: 'pie',
      borderWidth: 0,
      backgroundColor: '#f9f9f9',
      height: 350,
      width: 400
    },
    // ... resto de la configuración del gráfico de torta
  };

  public tarjetasSuperiores = [
    { titulo: 'Salas Cuna y Jardines Infantiles', valor: 0, icon: faChild, iconClass: 'class-name-1', tt_id:'tt1', tt_text: 'datos: Salas Cuna y Jardines Infantiles' },
    { titulo: 'Jardines Infantiles', valor: 0, icon: faChild, iconClass: 'class-name-2', tt_id:'tt1', tt_text: 'datos: Jardines Infantiles' },
    { titulo: 'Salas Cuna', valor: 0, icon: faBed, iconClass: 'class-name-3', tt_id:'tt1', tt_text: 'datos: Salas Cuna' },
    { titulo: 'Modalidad No Convencional', valor: 0, icon: faBaby, iconClass: 'class-name-4', tt_id:'tt1', tt_text: 'datos: Modalidad No Convencional' },
    { titulo: 'Establecimientos', valor: 0, icon: faPeopleRoof, iconClass: 'class-name-5', tt_id:'tt1', tt_text: 'datos: Establecimientos' },
    { titulo: 'Jardín Sobre Ruedas', valor: 0, icon: faBus, iconClass: 'class-name-6', tt_id:'tt1', tt_text: 'datos: Jardín Sobre Ruedas' }
  ];

  public tarjetasInferiores = [
    { titulo: 'Alimentación y Salud: Situación Nutricional', icon: faChild, valor: 50, iconClass: 'class-name-7' },
    { titulo: 'Equidad e Inclusión: Pueblos Originarios', icon: faGlobe, valor: 20, iconClass: 'class-name-8' },
    { titulo: 'Equidad e Inclusión: Migrantes', icon: faUsers, valor: 15, iconClass: 'class-name-9' },
    { titulo: 'Equidad e Inclusión: NEE', icon: faGraduationCap, valor: 10, iconClass: 'class-name-10' },
    { titulo: 'Vínculo con la Familia: Encuestas Familias', icon: faPeopleArrows, valor: 25, iconClass: 'class-name-11' },
    { titulo: 'Seguridad: Accidentes', icon: faShieldAlt, valor: 5, iconClass: 'class-name-12' },
    { titulo: 'Infraestructura: Reconocimiento Oficial', icon: faBuilding, valor: 30, iconClass: 'class-name-13' },
    { titulo: 'Infraestructura: Sello Verde', icon: faTree, valor: 18, iconClass: 'class-name-14' },
    { titulo: 'Aprendizajes: Asesorias Técnicas con Enfoque Territorial (ATET)', icon: faChalkboardTeacher, valor: 12, iconClass: 'class-name-15' },
    { titulo: 'Educación: EPG', icon: faChalkboardTeacher, valor: 40, iconClass: 'class-name-16' },
    { titulo: 'Educación Presupuestaria', icon: faDesktop, valor: 28, iconClass: 'class-name-17' },
    { titulo: 'Rendición y Costos', icon: faDesktop, valor: 33, iconClass: 'class-name-18' }
  ];

  totalAccidentes: import("../../models/dpgr-data.model").ConteoResponse | undefined;
  isLoading: boolean | undefined;
  errorMessage: string | undefined;
  presupuestoTotalDisplay: string | undefined;
  ejecutadoTotalDisplay: string | undefined;
  
  constructor(
    private http: HttpClient,
    private library: FaIconLibrary,
    private wsAdmSolService: WS_ADM_SOLService,
    private sharedDataService: SharedDataService,
    private dataService: DataService,
    private router: Router,
    private dashboardState: DashboardStateService,
    private accidenteService: DpgrService,
    private presupuestoService: PresupuestoService
  ) {
    const today = new Date();
    this.fechaActual = `${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`;
    this.library.addIcons(
      faChild, faBus, faBed, faCalendar, faPeopleRoof, faBaby, faGlobe, 
      faUsers, faGraduationCap, faPeopleArrows, faShieldAlt, faBuilding, 
      faTree, faChalkboardTeacher, faDesktop
    );

    this.dataSubscription = this.sharedDataService.processedData$.subscribe(data => {
      this.processedData = data;
    });
  }
  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  onButtonClick(index: number): void {
    this.buttonStateService.setActiveButton(index); // Cambia el botón activo
    // console.log(`Botón seleccionado: ${this.buttons1[index].eb_title}`);
  }

  ngOnInit(): void {
    this.dashboardState.initializeNationalView();
    console.log('=== VALORES INICIALES ===');
    console.log('Región:', this.dashboardState.selectedRegion);
    console.log('Vista Nacional:', this.dashboardState.vistaNacional);
    //console.log('Buttons1:', this.buttons1);
    //console.log('Buttons2:', this.buttons2);
    this.loadPresupuestoData();
    this.loadPresupuestoResumen();
    this.obtenerTotalAccidentes();
    //this.loadTarjetasSuperiores();
    this.loadEstablecimientosData("");
    this.validateButtons();
  }
  validateButtons(): void {
    if (!this.buttons1.length || !this.buttons2.length) {
      console.error('Error: Las listas de botones están vacías.');
    } else {
      console.log('Botones cargados correctamente.');
    }
  }
  obtenerTotalAccidentes(): void {
    this.accidenteService.getConteoJardines().subscribe({
      next: (data) => {
        this.totalAccidentes = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los datos: ' + error.message;
        this.isLoading = false;
      },
    });
  }

  private loadPresupuestoData(): void {
    try {
      const params: PresupuestoParams = {
        ano: Number(this.currentYear)
      };

      //console.log('=== Inicio de carga de datos presupuestarios ===');
      console.log('Query Params:', {
        ano: params.ano
      });

      this.presupuestoSubscription?.unsubscribe();
      
      this.presupuestoSubscription = this.presupuestoService
        .obtenerPresupuestoVsEjecutado(params)
        .pipe(
          tap(response => {
            console.log('Response completa:', response);
          }),
          catchError(error => {
            if (error.status === 404) {
              console.warn('No hay datos para el año:', this.currentYear);
              this.presupuestoData = [];
            } else {
              console.error('Error de servicio:', error);
              this.errorMessage = 'Error al cargar los datos de presupuesto';
            }
            this.updateCharts();
            return EMPTY;
          })
        )
        .subscribe({
          next: (value) => {
            if (value.success && value.data) {
              this.presupuestoData = value.data;
              this.updateCharts();
              console.log('Datos cargados exitosamente:', {
                total: value.data.length,
                datos: value.data
              });
            } else {
              this.presupuestoData = [];
              this.errorMessage = value.message;
              this.updateCharts();
            }
          },
          error: (err) => {
            console.error('Error en la suscripción:', err);
            this.presupuestoData = [];
            this.errorMessage = 'Error al procesar los datos';
            this.updateCharts();
          }
        });

    } catch (error) {
      console.error('Error en loadPresupuestoData:', error);
      this.presupuestoData = [];
      this.errorMessage = 'Error al iniciar la carga de datos';
      this.updateCharts();
    }
}
private loadEstablecimientosData(regionId: string): void {
  this.wsAdmSolService.getEstablecimientos(regionId).subscribe({
      next: (response) => {
          if (response) {
              this.tarjetasSuperiores = [
                  {
                    valor: response.totalEstablecimientos,
                    titulo: 'Establecimientos',
                    icon: faHome,
                    iconClass: '',
                    tt_id: '',
                    tt_text: ''
                  },
                  {
                    valor: response.totalSalaCunaJardin,
                    titulo: 'Salas Cuna y Jardines Infantiles',
                    icon: faBaby,
                    iconClass: '',
                    tt_id: '',
                    tt_text: ''
                  },
                  {
                    valor: response.totalParvulos,
                    titulo: 'Jardines Infantiles',
                    icon: faBed,
                    iconClass: '',
                    tt_id: '',
                    tt_text: ''
                  },
                  {
                    valor: response.totalSalaCuna,
                    titulo: 'Salas Cuna',
                    icon: faShoppingCart,
                    iconClass: '',
                    tt_id: '',
                    tt_text: ''
                  },
                  {
                    valor: response.totalAdmDelegada,
                    titulo: 'Modalidad No convencional',
                    icon: faChild,
                    iconClass: '',
                    tt_id: '',
                    tt_text: ''
                  },
                  {
                    valor: response.totalSinFuncionamiento,
                    titulo: 'Sin Funcionamiento',
                    icon: faBuildingCircleXmark,
                    iconClass: '',
                    tt_id: '',
                    tt_text: ''
                  },
                  {
                    valor: response.totalJardinSobreRuedas,
                    titulo: 'Jardines Sobre Ruedas',
                    icon: faBus,
                    iconClass: '',
                    tt_id: '',
                    tt_text: 'No se consideran en la Suma Total'
                  }
              ];
          }
      },
      error: (error) => {
          console.error('Error al cargar datos de establecimientos:', error);
      }
  });
}
private updateCharts(): void {
  try {
    if (!this.presupuestoData?.length) return;

    const categories = this.presupuestoData.map(item => item.Direccion);
    const presupuestoData = this.presupuestoData.map(item => 
      Number(item.PresupuestoVigente) || 0
    );
    const ejecutadoData = this.presupuestoData.map(item => 
      Number(item.MontoEjecutado) || 0
    );

    this.presupuestoTotal = presupuestoData.reduce((total, val) => total + val, 0);
    this.ejecutadoTotal = ejecutadoData.reduce((total, val) => total + val, 0);
    
    this.presupuestoTotalDisplay = Highcharts.numberFormat(this.presupuestoTotal, 0, ',', '.');
    this.ejecutadoTotalDisplay = Highcharts.numberFormat(this.ejecutadoTotal, 0, ',', '.');
    this.chartOptionsBar = {
      credits: { enabled: false },
      chart: { 
        type: 'bar',
        height: 800,
        backgroundColor: '#FFFFFF',
        style: {
          fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        spacingBottom: 30,
        spacingTop: 30,
        spacingLeft: 15,
        spacingRight: 15
      },
      title: { 
        text: 'PRESUPUESTO VS EJECUTADO',
        align: 'left',
        style: {
          fontSize: '12px',
          fontWeight: '600',
          color: '#000000'
        },
        margin: 20
      },
      xAxis: { 
        categories,
        labels: { 
          style: { 
            fontSize: '10px',
            color: '#333333'
          },
          rotation: 0
        },
        lineColor: '#E0E0E0',
        tickLength: 0,
        gridLineWidth: 0
      },
      yAxis: {
        min: 0,
        title: { 
          text: ''
        },
        labels: {
          formatter: function() {
            return Highcharts.numberFormat(this.value as number, 0, ',', '.');
          },
          style: {
            fontSize: '10px',
            color: '#666666'
          }
        },
        gridLineColor: '#E0E0E0',
        gridLineDashStyle: 'Dash',
        gridLineWidth: 1
      },
      plotOptions: {
        bar: {
          grouping: true,
          pointWidth: 12,
          borderRadius: 2
        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        symbolRadius: 2,
        itemStyle: {
          fontSize: '10px',
          fontWeight: 'normal'
        },
        itemDistance: 10,
        padding: 0,
        margin: 0
      },
      series: [{
        type: 'bar',
        name: 'Presupuesto Vigente',
        color: '#4A90E2',
        pointWidth: 12,
        data: presupuestoData
      }, {
        type: 'bar',
        name: 'Ejecutado',
        color: '#50C878',
        pointWidth: 12,
        data: ejecutadoData
      }] as SeriesOptionsType[],
      tooltip: {
        shared: true,
        formatter: function() {
          const points = this.points || [];
          let tooltipText = `<b>${this.x}</b><br/>`;
          points.forEach(point => {
            tooltipText += `${point.series.name}: ${Highcharts.numberFormat(point.y as number, 0, ',', '.')}<br/>`;
          });
          return tooltipText;
        }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            chart: {
              height: 600
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom'
            },
            yAxis: {
              labels: {
                align: 'left'
              }
            }
          }
        }]
      }
    };

    setTimeout(() => {
      this.initializeCharts();
    }, 100);

  } catch (error) {
    console.error('Error en la actualización de gráficos:', error);
  }
}

  private loadPresupuestoResumen(): void {
    this.dataSubscriptionEp = this.dataService.getPresupuestoResumen().subscribe((response) => {
      const resumenData = response["getePHomeNacional2"][0];
      this.gastosEjecutados = resumenData.gastos_ejecutados;
      this.saldoPorGastar = resumenData.saldo_por_gastar;
      this.initializeCharts();
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.dataSubscriptionEp) {
      this.dataSubscriptionEp.unsubscribe();
    }
    if (this.presupuestoSubscription) {
      this.presupuestoSubscription.unsubscribe();
    }
  }

  loadTarjetasSuperiores() {
    this.tarjetasSuperiores = tarjetasSuperioresData.map(item => ({
      tt_id: item.tt_id,
      tt_text: item.tt_text,
      titulo: item.tipo,
      valor: item.cantidad,
      icon: this.getIconForTipo(item.tipo),
      iconClass: 'class-name-1'
    }));
  }

  getIconForTipo(tipo: string) {
    switch (tipo) {
      case 'Salas Cuna y Jardines Infantiles':
      case 'Jardines Infantiles':
        return faChild;
      case 'Salas Cuna':
        return faBed;
      case 'Modalidad No Convencional':
        return faBaby;
      case 'Establecimientos':
        return faPeopleRoof;
      case 'Jardín Sobre Ruedas':
        return faBus;
      default:
        return faChild;
    }
  }

  private initializeCharts(): void {
    //console.log('Inicializando gráficos...');
    
    try {
      //console.log('Creando gráfico de barras...');
      const chartBar = Highcharts.chart('chart-bar-container', this.chartOptionsBar);
      //console.log('Gráfico de barras creado:', chartBar);
  
      //console.log('Creando gráfico circular...');
      const chartPie = Highcharts.chart('chart-pie-container', this.chartOptionsPie);
      //console.log('Gráfico circular creado:', chartPie);
    } catch (error) {
      console.error('Error al inicializar los gráficos:', error);
    }
  }

  private formatDireccion(direccion: string): string {
    if (!direccion) return '';
    let formattedName = direccion.replace('DIRECCION_', '').replace(/_/g, ' ');
    formattedName = formattedName.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    if (formattedName.length > 30) {
      formattedName = formattedName.substring(0, 27) + '...';
    }
    return formattedName;
  }

  toggleExpandInfoBox() {
    this.isExpanded = !this.isExpanded;
  }
}

@NgModule({
  declarations: [CustomDashboardInicialComponent],
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    HttpClientModule,
    RegionMapModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomDashboardInicialModule {}