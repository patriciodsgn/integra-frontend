import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DppiService } from '../../services/dppi.service';

@Component({
  selector: 'app-panel-dppi-accidentes',
  standalone: true,
  imports: [],
  templateUrl: './panel-dppi-accidentes.component.html',
  styleUrls: ['./panel-dppi-accidentes.component.css'],
})
export class PanelDppiAccidentesComponent implements OnInit {
  selectedYear: number = 2023; // Año seleccionado por defecto

  constructor(private dppiService: DppiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onYearChange(event: Event): void {
    const year = (event.target as HTMLSelectElement).value;
    this.selectedYear = parseInt(year, 10);
    this.loadData(); // Recarga los datos cuando se cambia el año
  }

  private loadData(): void {
    const ano = this.selectedYear;
    const codigoRegion = 0;

    // Gráfico de Info Clara y Oportuna
    this.dppiService.getInformacionClaraOportuna(ano, codigoRegion).subscribe({
      next: (res) => {
        if (res.success) {
          const { porcentajes } = res.data;
          this.renderChartClaraOportuna('chart1', porcentajes);
        }
      },
      error: (err) => {
        console.error('Error al cargar getInformacionClaraOportuna:', err);
      },
    });

    // Gráfico de Info Geográfica
    this.dppiService.getInformacionGeografica(ano, codigoRegion).subscribe({
      next: (res) => {
        if (res.success) {
          this.renderChartGeografica('chart2', res.data);
        }
      },
      error: (err) => {
        console.error('Error al cargar getInformacionGeografica:', err);
      },
    });
  }

  private renderChartClaraOportuna(container: string, porcentajes: any): void {
    Highcharts.chart(container, {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Información Clara y Oportuna',
      },
      xAxis: {
        categories: ['Acuerdo', 'Desacuerdo'],
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Porcentaje',
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      colors: [
        '#FFB6C1', '#FFCC99', '#FFDAB9', '#FFFACD', '#D8BFD8', '#E6E6FA',
        '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#98FB98', '#90EE90',
      ],
      series: [
        {
          name: 'Porcentaje',
          data: [porcentajes.acuerdo, porcentajes.desacuerdo],
          type: 'bar',
        },
      ],
    });
  }

  private renderChartGeografica(container: string, data: any[]): void {
    const regiones = data.map((item) => item.nombreRegion);
    const deAcuerdo = data.map((item) => item.deAcuerdo);
    const enDesacuerdo = data.map((item) => item.enDesacuerdo);

    Highcharts.chart(container, {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Información Geográfica',
      },
      xAxis: {
        categories: regiones,
        title: {
          text: 'Regiones',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Número de Encuestados',
        },
        stackLabels: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      colors: [
        '#FFB6C1', '#FFCC99', '#FFDAB9', '#FFFACD', '#D8BFD8', '#E6E6FA',
        '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#98FB98', '#90EE90',
      ],
      series: [
        {
          name: 'De Acuerdo',
          data: deAcuerdo,
          type: 'bar',
        },
        {
          name: 'En Desacuerdo',
          data: enDesacuerdo,
          type: 'bar',
        },
      ],
    });
  }
}
