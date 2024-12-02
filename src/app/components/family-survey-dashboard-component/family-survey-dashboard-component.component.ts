import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsExporting from 'highcharts/modules/exporting';

// Inicializar módulos
Highcharts3D(Highcharts);
HighchartsExporting(Highcharts);

@Component({
  selector: 'app-family-survey-dashboard',
  templateUrl: './family-survey-dashboard-component.component.html',
  styleUrls: ['./family-survey-dashboard-component.component.css']
})
export class FamilySurveyDashboardComponent {
  Highcharts = Highcharts;

  // Gráfico de Información Recibida (Pastel 3D)
  informationReceivedChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: { text: '' },
    plotOptions: {
      pie: {
        innerSize: '60%',  // Donut 3D
        depth: 45,
        dataLabels: {
          format: '{point.name} {point.percentage:.1f}%',
          style: { fontSize: '10px' }
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Información Recibida',
      data: [
        { name: 'De Acuerdo', y: 93, color: '#1E90FF' },
        { name: 'En Desacuerdo', y: 7, color: '#FF6347' }
      ]
    }]
  };

  // Gráfico de Información Geográfica (Columnas Apiladas 3D)
  informationGeographicChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50
      }
    },
    xAxis: {
      categories: [
        'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 
        'O’Higgins', 'Maule', 'Ñuble', 'Biobío', 'Araucanía', 'Los Lagos', 
        'Aysén', 'Magallanes'
      ],
      labels: { rotation: -45, style: { fontSize: '10px' } }
    },
    yAxis: { title: { text: 'Cantidad' } },
    plotOptions: {
      column: {
        depth: 25,
        stacking: 'normal'
      }
    },
    series: [
      { name: 'De Acuerdo', type: 'column', data: [372, 577, 437, 742, 1326, 861, 719, 442, 220, 210, 180, 130, 99], color: '#1E90FF' },
      { name: 'En Desacuerdo', type: 'column', data: [48, 45, 35, 37, 99, 63, 61, 38, 20, 18, 15, 10, 8], color: '#FF6347' }
    ]
  };

  // Gráfico de Participación Encuestados (Pastel 3D)
  participationSurveyChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: { text: '' },
    plotOptions: {
      pie: {
        innerSize: '60%',  // Donut 3D
        depth: 45,
        dataLabels: {
          format: '{point.name} {point.percentage:.1f}%',
          style: { fontSize: '10px' }
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Participación Encuestados',
      data: [
        { name: 'Sí', y: 83.1, color: '#1E90FF' },
        { name: 'No', y: 16.9, color: '#FF6347' }
      ]
    }]
  };

  // Gráfico de Participación Geográfica (Columnas Apiladas 3D)
  participationGeographicChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50
      }
    },
    xAxis: {
      categories: [
        'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 
        'O’Higgins', 'Maule', 'Ñuble', 'Biobío', 'Araucanía', 'Los Lagos', 
        'Aysén', 'Magallanes'
      ],
      labels: { rotation: -45, style: { fontSize: '10px' } }
    },
    yAxis: { title: { text: 'Cantidad' } },
    plotOptions: {
      column: {
        depth: 25,
        stacking: 'normal'
      }
    },
    series: [
      { name: 'Sí', type: 'column', data: [319, 521, 389, 675, 1177, 953, 946, 145, 142, 125, 98, 72, 63], color: '#1E90FF' },
      { name: 'No', type: 'column', data: [101, 80, 66, 99, 209, 148, 146, 54, 50, 42, 39, 28, 22], color: '#FF6347' }
    ]
  };
}
