import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import { DashboardService } from '../../core/services/dashboard.services';
import { PuebloOriginarioStats, RegionStats, EstadisticasTotales } from '../../core/models/models';
import { DashboardStateService } from '../../core/services/dashboard-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Options, YAxisOptions } from 'highcharts';

interface DataPoint {
  y: number;
  dataLabels?: Highcharts.DataLabelsOptions;
}

interface SeriesConfig {
  name: string;
  type: 'column';
  color: string;
  data: DataPoint[];
}

// Inicializar módulos
Highcharts3D(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

@Component({
  selector: 'app-indigenous-peoples-dashboard',
  templateUrl: './indigenous-peoples-dashboard.component.html',
  styleUrls: ['./indigenous-peoples-dashboard.component.css']
})
export class IndigenousPeoplesDashboardComponent implements OnInit {
  // Variables de estado global
  private destroy$ = new Subject<void>();
  vistaNacional: boolean = true;
  selectedRegion: number = 0;

  Highcharts = Highcharts;
  pueblosOriginarios: PuebloOriginarioStats[] = [];
  estadisticasRegion: RegionStats[] = [];
 
  estadisticasTotales: EstadisticasTotales = {
  nombre: '',
  totalNinos: 0,
  ninosOriginarios: 0,
  porcentaje: 0.0
  };

  nationalChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: '#f0f0f0',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    title: {
      text: 'Distribución de Pueblos Originarios',
      style: {
        color: '#333333',
        fontSize: '16px'
      }
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        depth: 45,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name} {point.percentage:.1f}%',
          distance: 15,
          style: {
            color: '#333333',
            fontWeight: 'bold'
          }
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
      type: 'pie',
      name: '% de niños y niñas',
      data: []
    }]
  };

  geographicChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: '#ffffff',
    },
    title: {
      text: 'Frecuencia Geográfica',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    subtitle: {
      text: 'Frecuencia niñas y niños Pueblos Originarios por división geográfica',
      align: 'center',
      style: {
        color: '#666666',
        fontSize: '14px'
      }
    },
    xAxis: {
      categories: [],
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Cantidad de niños',
        style: {
          fontSize: '12px'
        }
      },
      stackLabels: {
        enabled: true,
        formatter: function(this: any): string {
          return this.total > 0 ? this.total.toString() : '';
        },
        style: {
          fontWeight: 'bold',
          color: '#000000'
        }
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        pointWidth: 50,
        dataLabels: {
          enabled: true,
          color: '#000000',
          style: {
            fontSize: '10px'
          }
        }
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      layout: 'horizontal',
      itemStyle: {
        fontSize: '12px'
      }
    },
    colors: [
      '#000080', // Atacameño
      '#FFA500', // Aymará
      '#800080', // Colla
      '#FF0000', // Diaguita
      '#0000FF', // Mapuche
      '#008000', // Quechua
      '#FFD700'  // Rapa Nui
    ],
    series: []
};

  constructor(
    private dashboardService: DashboardService,
    private dashboardState: DashboardStateService
  ) {
    this.vistaNacional = this.dashboardState.vistaNacional;
    this.selectedRegion = this.dashboardState.selectedRegion;
    console.log('Estado inicial del dashboard 1:', {
      vistaNacional: this.vistaNacional,
      selectedRegion: this.selectedRegion,
    });
  }

  ngOnInit() {
    console.log('Estado inicial del dashboard 2:', {
      vistaNacional: this.vistaNacional,
      selectedRegion: this.selectedRegion,
      
    });
    
    // Suscribirse a cambios en el estado
    this.dashboardState.vistaNacional$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(isNacional => {
      console.log('Cambio en vista nacional:', isNacional);
      this.vistaNacional = isNacional;
      this.loadData();
    });

    this.dashboardState.region$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(region => {
      console.log('Cambio en región:', region);
      this.selectedRegion = region;
      this.loadData();
    });
    this.loadData();
  }

  onRegionChange(region: number) {
    this.selectedRegion = region;
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData() {
    console.log('Cargando datos para región:', this.selectedRegion);
    
    // Cargar estadísticas totales
    this.dashboardService.getEstadisticasTotalesPO(this.selectedRegion).subscribe((stats: EstadisticasTotales) => {
        this.estadisticasTotales = stats;
        console.log('Estadísticas totales:', stats);
    });

    // Cargar datos para el gráfico de torta
    this.dashboardService.getPueblosOriginarios().subscribe((data: PuebloOriginarioStats[]) => {
        this.pueblosOriginarios = data;
        console.log('Datos pueblos originarios:', data);
        this.updateNationalChart();
    });

    // Cargar datos para el gráfico geográfico
    this.dashboardService.getEstadisticasPorRegion(this.selectedRegion).subscribe((data: RegionStats[]) => {
        console.log('Datos geográficos recibidos:', data);
        this.estadisticasRegion = data;
        this.updateGeographicChart();
    });
}

  private updateNationalChart() {
    const chartData = this.pueblosOriginarios.map(pueblo => ({
      name: pueblo.nombre,
      y: pueblo.porcentaje,
      color: pueblo.color
    }));

    this.nationalChartOptions = {
      ...this.nationalChartOptions,
      series: [{
        type: 'pie',
        name: '% de niños y niñas',
        data: chartData
      }]
    };
  }

  private updateGeographicChart() {
    if (!this.estadisticasRegion || this.estadisticasRegion.length === 0) {
        console.warn('No hay datos para mostrar');
        return;
    }

    // Configuración de pueblos originarios en el orden correcto
    const pueblosConfig = [
        { id: 'Atacameño', color: '#000080' }, // Azul oscuro
        { id: 'Aymará', color: '#FFA500' },    // Naranja
        { id: 'Colla', color: '#800080' },     // Púrpura
        { id: 'Diaguita', color: '#FF0000' },  // Rojo
        { id: 'Mapuche', color: '#0000FF' },   // Azul
        { id: 'Quechua', color: '#008000' },   // Verde
        { id: 'Rapa Nui', color: '#FFD700' }   // Amarillo
    ];

    // Obtener comunas ordenadas
    const comunas = this.estadisticasRegion.map(stat => stat.comuna);

    // Crear series con los datos
    const series = pueblosConfig.map(pueblo => {
      const data = comunas.map(comuna => {
          const comunaData = this.estadisticasRegion.find(stat => stat.comuna === comuna);
          const value = comunaData?.stats[pueblo.id] || 0;  // Usar operador opcional
  
          return {
              y: value,
              dataLabels: {
                  enabled: value > 0,
                  formatter: function(this: any): string {
                      if (!this?.y) return '';
                      return this.y > 0 ? this.y.toString() : '';
                  }
              }
          };
      });
  
      return {
          name: pueblo.id,
          type: 'column' as const,
          color: pueblo.color,
          data
      };
  });

    // Calcular totales por comuna
    const totales = comunas.map(comuna => {
        const comunaData = this.estadisticasRegion.find(stat => stat.comuna === comuna);
        if (!comunaData) return 0;
        return Object.values(comunaData.stats).reduce((sum, val) => sum + (val || 0), 0);
    });

    this.geographicChartOptions = {
        chart: {
            type: 'column',
            backgroundColor: '#ffffff',
            height: 400
        },
        title: {
            text: 'Frecuencia Geográfica',
            align: 'center',
            style: { 
                color: '#666666',
                fontSize: '16px'
            }
        },
        subtitle: {
            text: 'Frecuencia niñas y niños Pueblos Originarios por división geográfica',
            align: 'center',
            style: { 
                color: '#95a5a6',
                fontSize: '14px'
            }
        },
        xAxis: {
            categories: comunas,
            labels: {
                rotation: 0,
                style: { 
                    fontSize: '12px',
                    fontWeight: 'bold'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad de niños',
                style: {
                    fontSize: '12px'
                }
            },
            stackLabels: {
                enabled: true,
                formatter: function(this: any): string {
                    const total = totales[this.x];
                    return total > 0 ? total.toString() : '';
                },
                style: {
                    fontWeight: 'bold',
                    color: 'black',
                    textOutline: 'none'
                }
            }
        },
        plotOptions: {
          column: {
              stacking: 'normal',
              pointWidth: 70,
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
                  color: '#000000',
                  style: {
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textOutline: 'none'
                  },
                  formatter: function(this: Highcharts.PointLabelObject): string {
                      return this.y && this.y > 0 ? this.y.toString() : '';
                  }
              }
          }
      },
        legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'top',
            layout: 'horizontal',
            itemStyle: {
                fontSize: '12px',
                fontWeight: 'normal'
            },
            symbolRadius: 6
        },
        credits: {
            enabled: false
        },
        colors: pueblosConfig.map(p => p.color),
        series: series
    } as Highcharts.Options;

    // Agregar los totales encima de cada barra
    const totalesSeries: Highcharts.SeriesOptionsType = {
      name: 'Totales',
      type: 'line',
      data: totales.map((total, index) => ({
          x: index,
          y: Math.max(...series.map(s => s.data.reduce((sum, point) => sum + (point.y || 0), 0))),
          dataLabels: {
              enabled: true,
              format: '{point.total}',
              verticalAlign: 'top',
              y: -20,
              style: {
                  fontSize: '14px',
                  fontWeight: 'bold'
              }
          }
      })),
      showInLegend: false,
      enableMouseTracking: false,
      dataLabels: {
          enabled: true,
          formatter: function() {
              return totales[this.point.x].toString();
          }
      }
  };

    // Asegurar que las series incluyan los totales
    this.geographicChartOptions = {
      ...this.geographicChartOptions,
      series: [...series, totalesSeries] as Highcharts.SeriesOptionsType[]
  };
    // Debug
    console.log('Chart data:', {
        comunas,
        series,
        totales,
        options: this.geographicChartOptions
    });
}
  private getColorForPueblo(pueblo: string): string {
    const colores: {[key: string]: string} = {
      'Atacameño': '#000080',
      'Aymará': '#FFA500',
      'Colla': '#800080',
      'Diaguita': '#FF0000',
      'Mapuche': '#0000FF',
      'Quechua': '#008000',
      'Rapa Nui': '#FFD700'
    };
    return colores[pueblo] || '#808080';
  }
}