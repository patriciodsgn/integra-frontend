import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-elem-draw-03',
  standalone: true,
  templateUrl: './elem-draw-03.component.html',
  styleUrls: ['./elem-draw-03.component.css']
})
export class ElemDraw03Component implements AfterViewInit {
  
  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    Highcharts.chart('chart-container-03', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Dato Power BI'
      },
      xAxis: {
        categories: ['Elemento 1', 'Elemento 2', 'Elemento 3']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Valores'
        }
      },
      tooltip: {
        valueSuffix: ' unidades'
      },
      plotOptions: {
        bar: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [
        {
          name: 'Azul Claro',
          data: [3, 5, 4],
          type: 'bar',
          color: '#87CEEB'
        },
        {
          name: 'Azul Oscuro',
          data: [2, 3, 2],
          type: 'bar',
          color: '#4682B4'
        }
      ]
    });
  }
}
