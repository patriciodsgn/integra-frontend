import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChild, faBus, faBed, faPeopleRoof, faCalendar, faBaby, faGlobe, faUsers, 
         faGraduationCap, faPeopleArrows, faShieldAlt, faBuilding, faTree, 
         faChalkboardTeacher, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { WS_ADM_SOLService } from 'src/app/services/WS_ADM_SOL.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import tarjetasSuperioresData from '../../../assets/tarjetas-superiores.json';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { DashboardStateService } from '../../core/services/dashboard-state.service';
import { DpgrService } from '../../services/dpgr.services';
import { RegionService } from '../../services/region.service';
//import { MapaChileComponent } from '../mapa-chile/mapa-chile.component';
import { RegionMapModule } from '../mapa-chile/region-map.module';
// También podrías necesitar estas importaciones si no están en el módulo del mapa
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { SeriesOptionsType } from 'highcharts';
import { PresupuestoService } from '../../services/presupuesto.service';
import { 
  PresupuestoParams, 
  ApiResponse, 
  PresupuestoEjecutado 
} from '../../models/presupuesto-data.model';
import { log } from 'console';

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
  // Suscripciones
  presupuestoTotal: number = 0;
ejecutadoTotal: number = 0;
  private dataSubscription: Subscription | undefined;
  private dataSubscriptionEp: Subscription | undefined;
  //private regionSubscription: Subscription | undefined;
  private presupuestoSubscription: Subscription | undefined;
  presupuestoData: PresupuestoEjecutado[] = [];
  
  currentYear = new Date().getFullYear();
  // Datos de jardines
  JardinesporRegion: Jardin[] = [];

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
    { titulo: 'Salas Cuna y Jardines Infantiles', valor: 0, icon: faChild, iconClass: 'class-name-1' },
    { titulo: 'Jardines Infantiles', valor: 0, icon: faChild, iconClass: 'class-name-2' },
    { titulo: 'Salas Cuna', valor: 0, icon: faBed, iconClass: 'class-name-3' },
    { titulo: 'Modalidad No Convencional', valor: 0, icon: faBaby, iconClass: 'class-name-4' },
    { titulo: 'Establecimientos', valor: 0, icon: faPeopleRoof, iconClass: 'class-name-5' },
    { titulo: 'Jardín Sobre Ruedas', valor: 0, icon: faBus, iconClass: 'class-name-6' }
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
    //private regionService: RegionService
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

  ngOnInit(): void {
    this.dashboardState.initializeNationalView();
    console.log('=== VALORES INICIALES ===');
    console.log('Región:', this.dashboardState.selectedRegion);
    console.log('Vista Nacional:', this.dashboardState.vistaNacional);

    this.loadPresupuestoData();
    this.loadPresupuestoResumen();
    this.obtenerTotalAccidentes();
    this.loadTarjetasSuperiores();

    // Suscripción a datos de regiones
    //this.regionSubscription = this.regionService.jardines$.subscribe(
    //  jardines => {
    //    this.JardinesporRegion = jardines;
    //  }
   // );
    
    // Iniciar carga de datos de jardines
    //this.regionService.fetchAllRegionData();
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
    const params: PresupuestoParams = {
      Ano: this.currentYear
      //Ano: 2023
    };
    const baseUrl = this.presupuestoService['baseUrl'];
    const fullUrl = `${baseUrl}/obtenerPresupuestoVsEjecutado?Ano=${this.currentYear}`;
    
    console.log('API Details:', {
      method: 'GET',
      url: fullUrl,
      params,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('=== Inicio de carga de datos presupuestarios ===');
    console.log('Parámetros de consulta:', params);
    console.log('URL del servicio:', this.presupuestoService['baseUrl']); // Para verificar la URL
  
    this.presupuestoSubscription = this.presupuestoService
      .obtenerPresupuestoVsEjecutado(params)
      .subscribe({
        next: (response: ApiResponse<PresupuestoEjecutado[]>) => {
          console.log('=== Respuesta del servicio ===');
          console.log('Estado de la respuesta:', {
            success: response.success,
            tieneData: !!response.data,
            mensaje: response.message,
            error: response.error
          });
          
          if (response.success && response.data) {
            console.log('Datos recibidos:', {
              cantidadRegistros: response.data.length,
              primerRegistro: response.data[0],
              ultimoRegistro: response.data[response.data.length - 1]
            });
            
            this.presupuestoData = response.data;
            console.log('Datos guardados en componente:', this.presupuestoData);
            this.updateCharts();
          } else {
            console.warn('Respuesta sin datos:', {
              mensaje: response.message,
              error: response.error
            });
          }
        },
        error: (error) => {
          console.error('=== Error en el servicio ===');
          console.error('Detalles del error:', {
            mensaje: error.message,
            status: error.status,
            statusText: error.statusText,
            error: error.error
          });
          this.errorMessage = `Error al cargar los datos de presupuesto: ${error.message}`;
        },
        complete: () => {
          console.log('=== Finalizada la llamada al servicio ===');
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
  
      // Calculate totals
      this.presupuestoTotal = presupuestoData.reduce((total, val) => total + val, 0);
      this.ejecutadoTotal = ejecutadoData.reduce((total, val) => total + val, 0);
  
      // Format for display
      this.presupuestoTotalDisplay = Highcharts.numberFormat(this.presupuestoTotal, 0, ',', '.');
      this.ejecutadoTotalDisplay = Highcharts.numberFormat(this.ejecutadoTotal, 0, ',', '.');
  
      this.chartOptionsBar = {
        credits: { enabled: false },
        chart: { 
          type: 'bar',
          height: Math.max(400, categories.length * 25)
        },
        title: { 
          text: 'Presupuesto vs Ejecutado',
          style: {
            fontSize: '16px',
            fontWeight: 'bold'
          }
        },
        xAxis: { 
          categories,
          labels: { 
            style: { fontSize: '11px' },
            rotation: 0
          }
        },
        yAxis: { 
          title: { text: 'Monto (CLP)' },
          labels: {
            formatter: function() {
              return Highcharts.numberFormat(this.value as number, 0, ',', '.');
            }
          }
        },
        tooltip: {
          formatter: function() {
            return `<b>${this.x}</b><br/>
                    ${this.series.name}: ${Highcharts.numberFormat(this.y as number, 0, ',', '.')}`;
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: false,
              formatter: function() {
                return Highcharts.numberFormat(this.y as number, 0, ',', '.');
              },
              style: {
                fontSize: '10px'
              }
            },
            pointPadding: 0.1,  // Mover aquí dentro de bar
            groupPadding: 0.1   // Mover aquí dentro de bar
          }
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal'
        },
        series: [{
          type: 'bar',
          name: 'Presupuesto Vigente',
          color: '#90CAF9',
          data: presupuestoData
        }, {
          type: 'bar',
          name: 'Ejecutado',
          color: '#81C784',
          data: ejecutadoData
        }] as SeriesOptionsType[]
      };
  
      // Initialize charts with a small delay to ensure DOM is ready
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
    //if (this.regionSubscription) {
    //  this.regionSubscription.unsubscribe();
    //}
  }

  loadTarjetasSuperiores() {
    this.tarjetasSuperiores = tarjetasSuperioresData.map(item => ({
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
      case 'Sala Cuna':
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
    console.log('Inicializando gráficos...');
    
    try {
      console.log('Creando gráfico de barras...');
      const chartBar = Highcharts.chart('chart-bar-container', this.chartOptionsBar);
      console.log('Gráfico de barras creado:', chartBar);
  
      console.log('Creando gráfico circular...');
      const chartPie = Highcharts.chart('chart-pie-container', this.chartOptionsPie);
      console.log('Gráfico circular creado:', chartPie);
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