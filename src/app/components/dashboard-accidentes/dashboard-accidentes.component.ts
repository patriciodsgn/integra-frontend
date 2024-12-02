
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';

// Inicializar Highcharts con módulo 3D
Highcharts3D(Highcharts);

@Component({
  selector: 'app-dashboard-accidentes',
  templateUrl: './dashboard-accidentes.component.html',
  styleUrls: ['./dashboard-accidentes.component.css']
})
export class DashboardAccidentesComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  accidentRateChartOptions: Highcharts.Options = {};
  geographicChartOptions2022: Highcharts.Options = {};
  geographicChartOptions2023: Highcharts.Options = {};
  jornadaChartOptions2022: Highcharts.Options = {};
  jornadaChartOptions2023: Highcharts.Options = {};

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Configuración para la tasa de accidentes
    this.accidentRateChartOptions = {
      chart: {
        type: 'column',
        backgroundColor: '#e6eaf7',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25
        }
      },
      title: { text: 'Tasa de Accidentes' },
      series: [{
        type: 'column',
        name: 'Accidentes',
        data: [2.3, 3.2],
        colorByPoint: true
      }]
    };

    // Configuración para Accidentes Geográficos 2022
    this.geographicChartOptions2022 = {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 10,
          beta: 10,
          depth: 50
        }
      },
      title: { text: 'Accidentes por División Geográfica - 2022' },
      xAxis: { categories: ['Coquimbo', 'Valparaíso', 'Maule', 'Araucanía', 'Los Lagos'] },
      series: [{
        type: 'column',
        name: '2022',
        data: [5, 7, 3, 8, 4],
        color: '#008ffb'
      }]
    };

    // Configuración para Accidentes Geográficos 2023
    this.geographicChartOptions2023 = {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 10,
          beta: 10,
          depth: 50
        }
      },
      title: { text: 'Accidentes por División Geográfica - 2023' },
      xAxis: { categories: ['Coquimbo', 'Valparaíso', 'Maule', 'Araucanía', 'Los Lagos'] },
      series: [{
        type: 'column',
        name: '2023',
        data: [6, 8, 4, 9, 5],
        color: '#00e396'
      }]
    };

    // Configuración para Accidentes por Jornada 2022 (Gráfico de Pastel)
    this.jornadaChartOptions2022 = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      title: { text: 'Accidentes por Jornada - 2022' },
      plotOptions: {
        pie: {
          innerSize: 70,
          depth: 45
        }
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: [
          ['Normal', 71.1],
          ['Extensión Horaria', 26.4],
          ['Sin Jornada', 2.5]
        ]
      }]
    };

    // Configuración para Accidentes por Jornada 2023 (Gráfico de Pastel)
    this.jornadaChartOptions2023 = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      title: { text: 'Accidentes por Jornada - 2023' },
      plotOptions: {
        pie: {
          innerSize: 70,
          depth: 45
        }
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: [
          ['Normal', 66.4],
          ['Extensión Horaria', 30.6],
          ['Sin Jornada', 3.0]
        ]
      }]
    };
  }
}
