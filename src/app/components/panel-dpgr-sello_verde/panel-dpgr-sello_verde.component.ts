import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';
import { CommonModule } from '@angular/common';
import { REGIONS } from '../../shared/regions';

@Component({
  selector: 'app-panel-dpgr-sello-verde',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './panel-dpgr-sello_verde.component.html',
  styleUrls: ['./panel-dpgr-sello_verde.component.css'],
})
export class PanelDpgrSello_verdeComponent implements OnInit {

  years: number[] = [2019, 2020, 2021, 2022, 2023, 2024];
  selectedYear: number = 2024;
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

  public loadData(year: number, codeRegion: number): void {
    const codigoRegion = 0;

    this.dpgrService.getTotalJardinesSelloVerde(year, codeRegion).subscribe({
      next: (res) => {
        console.log(`Datos del año ${year}:`, res.data);
        this.renderChart(res.data);
      },
      error: (err) => {
        console.error('Error al cargar:', err);
      },
    });
  }

  // Renderizar el gráfico de barras verticales
  private renderChart(data: any): void {
    Highcharts.chart('chart1', {
      chart: {
        type: 'column', // Cambiado a gráfico de barras verticales
      },
      title: {
        text: `Distribución de Jardines (${this.selectedYear})`,
      },
      xAxis: {
        categories: ['Vigentes', 'Cerrados', 'Otros'], // Categorías del eje X
        title: {
          text: 'Estado',
        },
      },
      yAxis: {
        min: 0,
        max: 500, 
        title: {
          text: 'Número de Jardines',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>',
      },
      plotOptions: {
        column: {
          colorByPoint: true, // Colores diferentes para cada barra
          borderRadius: 5, // Esquinas redondeadas
        },
      },
      colors: [
        '#90EE90', '#FFB6C1', '#FFCC99', '#98FB98', '#FFFACD', '#D8BFD8',
        '#E6E6FA', '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#FFDAB9',
      ], // Paleta de colores pastel
      series: [
        {
          name: 'Jardines',
          type: 'column',
          data: [
            data.totalJardinesVigentes || 0, // Jardines Vigentes
            data.totalJardinesCerrados || 0, // Jardines Cerrados
            (data.totalJardines || 0) - (data.totalJardinesVigentes || 0) - (data.totalJardinesCerrados || 0), // Otros
          ],
        },
      ],
      credits: {
        enabled: false, // Ocultar el logo de Highcharts
      },
    });
  }
}
