import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';

interface NacionalidadesData {
  [comuna: string]: {
    nombreRegion: string;
    nacionalidades: {
      [nacionalidad: string]: number;
    };
  };
}

@Component({
  selector: 'app-panel-dpgr-nacionalidad',
  standalone: true,
  imports: [],
  templateUrl: './panel-dpgr-nacionalidad.component.html',
  styleUrls: ['./panel-dpgr-nacionalidad.component.css'],
})
export class PanelDpgrNacionalidadComponent implements OnInit {
  selectedYear = 2023;

  constructor(private dpgrService: DpgrService) {}

  ngOnInit(): void {
    this.loadData(this.selectedYear);
  }

  // Manejar cambio de año desde el selector
  onYearChange(event: Event): void {
    const year = +(event.target as HTMLSelectElement).value;
    this.selectedYear = year;
    this.loadData(this.selectedYear);
  }

  // Cargar y procesar datos
  public loadData(year: number): void {
    const codigoRegion = 0;

    this.dpgrService.getNacionalidadPorGeografia(year, codigoRegion).subscribe({
      next: (res) => {
        const chartData = this.processGeographyData(res.data);
        this.renderBarChart(chartData, 'chart1');
      },
      error: (err) => console.error('Error al cargar: getNacionalidadPorGeografia', err),
    });

    this.dpgrService.getPorcentajeNacionalidadExtranjera(year, codigoRegion).subscribe({
      next: (res) => {
        const pieData = this.processNationalityData(res.data.detalleNacionalidades);
        this.renderPieChart(pieData, 'chart2');
      },
      error: (err) => console.error('Error al cargar: getPorcentajeNacionalidadExtranjera', err),
    });
  }

  
  // Procesar datos para el gráfico de barras
  private processGeographyData(data: NacionalidadesData): { categories: string[]; seriesData: number[] } {
    
    const categories: string[] = [];
    const seriesData: number[] = [];
  
    for (const comuna in data) {
      if (data[comuna]?.nacionalidades) {
        // Aseguramos el tipo de los valores
        const total = Object.values(data[comuna].nacionalidades).reduce(
          (acc: number, val: number) => acc + val,
          0
        );
        categories.push(comuna);
        seriesData.push(total);
      }
    }
  
    return { categories, seriesData };
  }
  

  // Procesar datos para el gráfico de torta
  private processNationalityData(data: any[]): { name: string; y: number }[] {
    return data.map((item) => ({
      name: item.nacionalidad || 'Sin Especificar',
      y: item.total,
    }));
  }

  // Renderizar gráfico de barras horizontales
  private renderBarChart(data: { categories: string[]; seriesData: number[] }, chartId: string): void {
    Highcharts.chart(chartId, {
      chart: {
        type: 'bar',
      },
      title: {
        text: `Nacionalidades por Comuna (${this.selectedYear})`,
      },
      xAxis: {
        categories: data.categories,
        title: {
          text: 'Comunas',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cantidad de Nacionalidades',
        },
      },
      series: [
        {
          name: 'Nacionalidades',
          type: 'bar',
          data: data.seriesData,
          colorByPoint: true,
        },
      ],
      colors: Highcharts.getOptions().colors,
      credits: {
        enabled: false,
      },
    });
  }

  // Renderizar gráfico de torta
  private renderPieChart(data: { name: string; y: number }[], chartId: string): void {
    Highcharts.chart(chartId, {
      chart: {
        type: 'pie',
      },
      title: {
        text: `Distribución de Nacionalidades (${this.selectedYear})`,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f}%',
          },
        },
      },
      series: [
        {
          name: 'Nacionalidad',
          type: 'pie',
          data,
        },
      ],
      colors: [
        '#FFB6C1', '#FFCC99', '#FFDAB9', '#FFFACD', '#D8BFD8', '#E6E6FA',
        '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#98FB98', '#90EE90',
      ], // Colores pastel personalizados
      credits: {
        enabled: false,
      },
    });
  }

}
