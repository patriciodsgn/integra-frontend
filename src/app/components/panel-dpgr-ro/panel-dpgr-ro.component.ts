import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';
import { CommonModule } from '@angular/common';
import { REGIONS } from '../../shared/regions';

@Component({
  selector: 'app-panel-dpgr-ro',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './panel-dpgr-ro.component.html',
  styleUrls: ['./panel-dpgr-ro.component.css'],
})
export class PanelDpgrRoComponent implements OnInit {

  years: number[] = [2017, 2018, 2019, 2020, 2021, 2022];
  selectedYear: number = 2022;
  regions = REGIONS;
  selectedRegion: number = 0;

  constructor(private dpgrService: DpgrService) {}

  ngOnInit(): void {
    this.loadData(this.selectedYear, this.selectedRegion);
  }

  onYearChange(event: Event): void {
    this.selectedYear = +(event.target as HTMLSelectElement).value;
    this.loadData(this.selectedYear, this.selectedRegion);
  }

  onRegionChange(event: Event): void {
    this.selectedRegion = +(event.target as HTMLSelectElement).value;
    this.loadData(this.selectedYear, this.selectedRegion);
  }



  // Cargar datos y renderizar el gráfico
  private loadData(year: number, codeRegion: number): void {
    this.dpgrService.getEstadisticasRO(year, codeRegion).subscribe({
      next: (res) => {
        if (res.data && res.data.detalleJardines) {
          const chartData = this.processData(res.data.detalleJardines);
          this.renderChart(chartData);
        } else {
          console.warn('No hay datos para mostrar.');
          this.renderChart({ categories: [], seriesData: [] });
        }
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
      },
    });
  }

  // Procesar los datos para el gráfico
  private processData(detalleJardines: any[]): { categories: string[]; seriesData: number[] } {
    const data = detalleJardines.reduce((acc: any, jardin: any) => {
      const region = jardin.region;
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});

    return {
      categories: Object.keys(data),
      seriesData: Object.values(data),
    };
  }

  // Renderizar el gráfico
  private renderChart(data: { categories: string[]; seriesData: number[] }): void {
    Highcharts.chart('chart1', {
      chart: {
        type: 'bar',
        height: Math.max(data.categories.length * 25, 300),
      },
      title: {
        text: `Número de Jardines por Región (${this.selectedYear})`,
      },
      xAxis: {
        categories: data.categories,
        title: { text: 'Regiones' },
        labels: { style: { fontSize: '10px' } },
      },
      yAxis: {
        min: 0,
        title: { text: 'Número de Jardines' },
        labels: { style: { fontSize: '10px' } },
      },
      plotOptions: {
        bar: {
          colorByPoint: true,
          borderRadius: 5,
          groupPadding: 0.02,
          pointPadding: 0.02,
        },
      },
      colors: [
        '#FFB6C1', '#FFCC99', '#FFDAB9', '#FFFACD', '#D8BFD8', '#E6E6FA',
        '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#98FB98', '#90EE90'
      ],
      series: [{
        name: 'Jardines',
        type: 'bar',
        data: data.seriesData,
        showInLegend: false,
      }],
      credits: { enabled: false },
    });
  }
}
