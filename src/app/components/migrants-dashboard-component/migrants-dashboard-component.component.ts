import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

// Inicializar módulos
Highcharts3D(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

// Inicializar módulos
Highcharts3D(Highcharts);
HighchartsExporting(Highcharts);

@Component({
  selector: 'app-migrants-dashboard',
  templateUrl: './migrants-dashboard-component.component.html',
  styleUrls: ['./migrants-dashboard-component.component.css']
})
export class MigrantsDashboardComponent {
  Highcharts = Highcharts;

  // Opciones de Gráfico de Nacionalidades (Pastel)
  nationalityChartOptions: Highcharts.Options = {
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
        innerSize: '60%',  // Gráfico donut
        depth: 45,
        dataLabels: {
          format: '{point.name} {point.percentage:.1f}%',
          style: { fontSize: '10px' }
        }
      }
    },
    series: [{
      type: 'pie',
      name: '% de niños y niñas',
      data: [
        { name: 'Venezolana', y: 31.7 },
        { name: 'Peruana', y: 17.6 },
        { name: 'Colombiana', y: 15.5 },
        { name: 'Boliviana', y: 13.8 },
        { name: 'Haitiana', y: 10.4 },
        { name: 'Ecuatoriana', y: 5.9 },
        { name: 'Otra', y: 1.4 }
      ]
    }]
  };

  // Opciones de Gráfico de División Geográfica (Columnas Apiladas)
  geographicDivisionChartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: { text: '' },
    xAxis: {
      categories: ['Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'O’Higgins', 'Maule', 'Ñuble', 'Biobío', 'Los Ríos', 'Aysén', 'Magallanes']
    },
    yAxis: {
      title: { text: 'Cantidad' }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: [
      { name: 'Argentina', type: 'column', data: [279, 263, 139, 218, 385, 365, 378, 124, 82, 96, 30, 10], color: '#FFD700' },
      { name: 'Boliviana', type: 'column', data: [135, 143, 142, 133, 153, 62, 138, 87, 94, 85, 29, 15], color: '#FF6347' },
      { name: 'Brasileña', type: 'column', data: [98, 102, 85, 72, 61, 39, 33, 28, 27, 25, 9, 5], color: '#FF69B4' },
      { name: 'Colombiana', type: 'column', data: [313, 312, 203, 198, 154, 129, 109, 91, 76, 63, 24, 18], color: '#4169E1' },
      { name: 'Ecuatoriana', type: 'column', data: [92, 95, 87, 85, 82, 79, 73, 67, 63, 60, 22, 16], color: '#00FA9A' },
      { name: 'Haitiana', type: 'column', data: [219, 167, 149, 145, 142, 136, 125, 119, 98, 89, 34, 25], color: '#8A2BE2' },
      { name: 'Otra', type: 'column', data: [62, 62, 60, 58, 56, 52, 50, 48, 45, 42, 18, 13], color: '#A9A9A9' },
      { name: 'Peruana', type: 'column', data: [878, 985, 980, 890, 870, 820, 790, 760, 720, 690, 280, 210], color: '#FF8C00' },
      { name: 'Venezolana', type: 'column', data: [254, 312, 385, 365, 365, 300, 270, 250, 245, 220, 90, 60], color: '#1E90FF' }
    ]
  };
}
