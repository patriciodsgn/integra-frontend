import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_3D from 'highcharts/highcharts-3d';

// Activar el módulo 3D en Highcharts
HC_3D(Highcharts);

@Component({
  selector: 'app-dashboard-sello-verde',
  templateUrl: './dashboard-sello-verde.component.html',
  styleUrls: ['./dashboard-sello-verde.component.css']
})
export class DashboardSelloVerdeComponent {
  Highcharts = Highcharts;

  // Configuración del gráfico de barras 3D (Sellos Verdes obtenidos por año)
  barChart3DOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['2021', '2022', '2023', '2024']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Sellos Verdes'
      }
    },
    plotOptions: {
      column: {
        depth: 25
      }
    },
    series: [
      {
        name: 'Sellos Verdes',
        type: 'column',
        data: [40, 250, 585, 153],
        colorByPoint: true
      }
    ]
  };

  // Configuración del gráfico de columnas 3D (Tasa Vigencia)
  columnChart3DOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: [
        'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'O’Higgins',
        'Maule', 'Biobío', 'Araucanía', 'Los Lagos', 'Aysén', 'Magallanes'
      ],
      labels: {
        rotation: -45
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Tasa de Vigencia (%)'
      }
    },
    plotOptions: {
      column: {
        depth: 25
      }
    },
    series: [
      {
        name: 'Tasa Vigencia 2023',
        type: 'column',
        data: [80, 60, 70, 90, 85, 75, 95, 60, 80, 90, 70, 65],
        color: '#4A90E2'
      },
      {
        name: 'Tasa Vigencia 2022',
        type: 'column',
        data: [60, 50, 55, 70, 65, 55, 75, 45, 65, 70, 50, 55],
        color: '#50E3C2'
      }
    ]
  };
}
