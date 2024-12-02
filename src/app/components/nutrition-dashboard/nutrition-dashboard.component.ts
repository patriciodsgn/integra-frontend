import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
    selector: 'app-nutrition-dashboard',
    templateUrl: './nutrition-dashboard.component.html',
    styleUrls: ['./nutrition-dashboard.component.css']
})
export class NutritionDashboardComponent implements OnInit {

    Highcharts: typeof Highcharts = Highcharts;
    distributionChartOptions!: Highcharts.Options;
    geographicChartOptions!: Highcharts.Options;
    isVisible: boolean = true;
    constructor() {}

    ngOnInit(): void {
        HC_exporting(Highcharts);

        // Configuración del gráfico de pastel
        this.distributionChartOptions = {
          chart: {
              type: 'pie'

          },
          title: {
              
          },
          plotOptions: {
              pie: {
                  innerSize: '60%',
                  dataLabels: {
                      enabled: true,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  }
              }
          },
          series: [{
              type: 'pie',
              data: [
                  { name: 'Normal', y: 55.2, color: '#3498db' },
                  { name: 'Sobrepeso', y: 25.9, color: '#f1c40f' },
                  { name: 'Obesidad', y: 11.4, color: '#e74c3c' },
                  { name: 'Riesgo de Desnutrir', y: 6.0, color: '#95a5a6' }
              ]
          }]
      };

        // Configuración del gráfico de columnas apiladas
        this.geographicChartOptions = {
          chart: {
              type: 'column',
              backgroundColor: undefined // Cambia `null` por `undefined`
          },
          
          xAxis: {
              categories: [
                  'REGIÓN 1', 'REGIÓN 2', 'REGIÓN 3', // Añade más regiones según tus datos
              ],
              labels: {
                  rotation: -45
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: null
              },
              stackLabels: {
                  enabled: true,
                  style: {
                      fontWeight: 'bold',
                  }
              }
          },
          legend: {
              align: 'center',
              verticalAlign: 'top',
              layout: 'horizontal'
          },
          plotOptions: {
              column: {
                  stacking: 'normal',
                  dataLabels: {
                      enabled: true,
                  }
              }
          },
          series: [
              { name: 'Desnutrición', data: [42, 57, 85], type: 'column', color: '#8e44ad' },
              { name: 'Normal', data: [150, 130, 180], type: 'column', color: '#2ecc71' },
              { name: 'Obesidad', data: [95, 120, 150], type: 'column', color: '#e74c3c' },
              { name: 'Riesgo de Desnutrir', data: [32, 45, 60], type: 'column', color: '#f1c40f' },
              { name: 'Sobrepeso', data: [70, 90, 100], type: 'column', color: '#3498db' }
          ]
      };
      
    }
}
