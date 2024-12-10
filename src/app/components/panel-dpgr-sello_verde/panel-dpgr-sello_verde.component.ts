import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';

@Component({
  selector: 'app-panel-dpgr-sello-verde',
  standalone: true,
  imports: [],
  templateUrl: './panel-dpgr-sello_verde.component.html',
  styleUrls: ['./panel-dpgr-sello_verde.component.css'],
})
export class PanelDpgrSello_verdeComponent implements OnInit {
  selectedYear = 2024;

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

  // Cargar datos y renderizar el gráfico
  public loadData(year: number): void {
    const codigoRegion = 0;

    this.dpgrService.getTotalJardinesSelloVerde(year, codigoRegion).subscribe({
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
