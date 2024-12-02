import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';

@Component({
  selector: 'app-dashboard-reconocimiento',
  templateUrl: './dashboard-reconocimiento.component.html',
  styleUrls: ['./dashboard-reconocimiento.component.css']
})
export class DashboardReconocimientoComponent {
  Highcharts = Highcharts;

  // Configuración para el gráfico de pastel (Año de Reconocimiento)
  pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    series: [
      {
        name: 'Año',
        type: 'pie',
        data: [
          { name: '2019', y: 163 },
          { name: '2018', y: 99 },
          { name: '2020', y: 83 },
          { name: '2021', y: 61 },
          { name: '2022', y: 48 },
          { name: '2023', y: 11 },
          { name: '2024', y: 1 }
        ]
      }
    ],
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}'
        }
      }
    }
  };

  // Configuración para el gráfico de barras (Reconocimiento Geográfico)
  barChartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'O’Higgins', 'Maule', 'Biobío', 'Araucanía', 'Los Lagos', 'Aysén', 'Magallanes']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Cantidad de Reconocimientos'
      }
    },
    series: [
      {
        name: 'Reconocimiento',
        type: 'column',
        data: [16, 12, 14, 41, 46, 57, 79, 84, 65, 52, 71, 32]
      }
    ]
  };
}

