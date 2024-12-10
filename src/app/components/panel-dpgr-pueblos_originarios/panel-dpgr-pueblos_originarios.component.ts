import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';

@Component({
  selector: 'app-panel-dpgr-pueblos-originarios',
  standalone: true,
  imports: [],
  templateUrl: './panel-dpgr-pueblos_originarios.component.html',
  styleUrls: ['./panel-dpgr-pueblos_originarios.component.css'],
})
export class PanelDpgrPueblos_originariosComponent implements OnInit {
  selectedYear = 2023;

  constructor(private dpgrService: DpgrService) {}

  ngOnInit(): void {
    this.loadData(this.selectedYear);
  }

  // Manejar cambio de año desde el selector
  onYearChange(event: Event): void {
    const year = +(event.target as HTMLSelectElement).value; // Convertir a número
    this.selectedYear = year;
    this.loadData(this.selectedYear);
  }

  // Cargar datos y renderizar gráficos
  public loadData(year: number): void {
    const codigoRegion = 0;

    // Gráfico de barras horizontales
    this.dpgrService.getFrecuenciaPueblosOriginarios(year, codigoRegion).subscribe({
      next: (res) => {
        console.log(`Datos del año ${year}:`, res);
        const chartData = this.processData(res.data);
        this.renderBarChart(chartData);
      },
      error: (err) => {
        console.error('Error al cargar:', err);
      },
    });

    // Gráfico circular
    this.dpgrService.getPorcentajePueblosOriginarios(year, codigoRegion).subscribe({
      next: (res) => {
        console.log('Datos de porcentaje:', res);
        this.renderPieChart(res.data.detallePueblos);
      },
      error: (err) => {
        console.error('Error al cargar:', err);
      },
    });
  }

  // Procesar los datos agrupando por región
  private processData(data: any[]): { categories: string[]; seriesData: number[] } {
    const groupedData = data.reduce((acc: any, item: any) => {
      const region = item.nombreRegion;
      if (!acc[region]) acc[region] = 0;
      acc[region] += item.frecuencia;
      return acc;
    }, {});

    return {
      categories: Object.keys(groupedData), // Nombres de las regiones
      seriesData: Object.values(groupedData), // Suma de frecuencias por región
    };
  }

  // Renderizar gráfico de barras horizontales
  private renderBarChart(data: { categories: string[]; seriesData: number[] }): void {
    Highcharts.chart('chart1', {
      chart: {
        type: 'bar', // Gráfico horizontal
      },
      title: {
        text: `Frecuencia de Pueblos Originarios (${this.selectedYear})`,
      },
      xAxis: {
        categories: data.categories,
        title: {
          text: 'Regiones',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Frecuencia',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>',
      },
      plotOptions: {
        bar: {
          colorByPoint: true,
          borderRadius: 5,
          groupPadding: 0.05,
          pointPadding: 0.05,
        },
      },
      colors: [
        '#FFB6C1', '#FFCC99', '#FFDAB9', '#FFFACD', '#D8BFD8', '#E6E6FA',
        '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#98FB98', '#90EE90',
      ],
      series: [
        {
          name: 'Frecuencia',
          type: 'bar',
          data: data.seriesData,
          showInLegend: false,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  // Renderizar gráfico circular
  private renderPieChart(data: any[]): void {
    const pieData = data.map((item: any) => ({
      name: item.pueblo || 'Desconocido',
      y: item.porcentaje,
    }));

    Highcharts.chart('chart2', {
      chart: {
        type: 'pie',
      },
      title: {
        text: `Distribución por Pueblos Originarios (${this.selectedYear})`,
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f}%',
            style: {
              fontSize: '12px',
              color: '#333',
            },
          },
        },
      },
      series: [
        {
          name: 'Pueblos Originarios',
          type: 'pie',
          data: pieData,
        },
      ],
      colors: [
        '#FFB6C1',
        '#87CEEB',
        '#D8BFD8',
        '#98FB98',
        '#FFDAB9',
        '#87CEFA',
        '#FFFACD',
        '#ADD8E6',
        '#E6E6FA',
        '#B0E0E6',
        '#FFCC99',
        '#90EE90',
      ],
      credits: {
        enabled: false,
      },
    });
  }
}
