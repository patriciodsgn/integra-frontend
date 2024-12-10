import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';

@Component({
  selector: 'app-panel-dpgr-ro',
  standalone: true,
  imports: [],
  templateUrl: './panel-dpgr-ro.component.html',
  styleUrls: ['./panel-dpgr-ro.component.css'],
})
export class PanelDpgrRoComponent implements OnInit {
  selectedYear = 2022; // Año seleccionado por defecto

  constructor(private dpgrService: DpgrService) {}

  ngOnInit(): void {
    this.loadData(this.selectedYear);
  }

  // Maneja el cambio del año desde el select
  onYearChange(event: Event): void {
    const year = +(event.target as HTMLSelectElement).value; // Convertir a número
    this.selectedYear = year;
    this.loadData(this.selectedYear);
  }

  // Cargar datos y renderizar el gráfico
  private loadData(year: number): void {
    const codigoRegion = 0;

    this.dpgrService.getEstadisticasRO(year, codigoRegion).subscribe({
      next: (res) => {
        console.log(`Datos del año ${year}:`, res);
        const chartData = this.processData(res.data.detalleJardines);
        this.renderChart(chartData);
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
      },
    });
  }

  private processData(detalleJardines: any[]): { categories: string[]; seriesData: number[] } {
    const data = detalleJardines.reduce((acc: any, jardin: any) => {
      const region = jardin.region;
      if (!acc[region]) acc[region] = 0;
      acc[region]++;
      return acc;
    }, {});

    return {
      categories: Object.keys(data),
      seriesData: Object.values(data),
    };
  }

  // Gráfico Horizontal
  private renderChart(data: { categories: string[]; seriesData: number[] }): void {
    Highcharts.chart('chart1', {
      chart: {
        type: 'bar', // Gráfico horizontal
        height: Math.max(data.categories.length * 25, 300), // Ajusta la altura dinámica en función de la cantidad de categorías
      },
      title: {
        text: `Número de Jardines por Región (${this.selectedYear})`,
        margin: 10, // Reduce espacio del título
      },
      xAxis: {
        categories: data.categories,
        title: {
          text: 'Regiones',
        },
        labels: {
          style: {
            fontSize: '10px', // Tamaño más compacto de las etiquetas
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Número de Jardines',
        },
        labels: {
          style: {
            fontSize: '10px',
          },
        },
      },
      plotOptions: {
        bar: {
          colorByPoint: true,
          borderRadius: 5,
          groupPadding: 0.02, // Reduce espacio entre grupos
          pointPadding: 0.02, // Reduce espacio entre barras individuales
        },
      },
      colors: [
        '#FFB6C1', '#FFCC99', '#FFDAB9', '#FFFACD', '#D8BFD8', '#E6E6FA',
        '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#98FB98', '#90EE90'
      ],
      series: [
        {
          name: 'Jardines',
          type: 'bar',
          data: data.seriesData,
          showInLegend: false,
        },
      ],
      credits: {
        enabled: false, // Deshabilita el logo de Highcharts
      },
    });
  }
  
}
