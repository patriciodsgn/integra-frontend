import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-elem-draw-04',
  standalone: true,
  templateUrl: './elem-draw-04.component.html',
  styleUrls: ['./elem-draw-04.component.css']
})
export class ElemDraw04Component implements AfterViewInit {

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    Highcharts.chart('chart-container-04', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Dato Power BI'
      },
      xAxis: {
        categories: ['Categoría 1', 'Categoría 2', 'Categoría 3']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Valores'
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' unidades'
      },
      plotOptions: {
        column: {
          grouping: true,
          shadow: false,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Azul Claro',
          data: [7, 6, 5],
          type: 'column',
          color: '#87CEEB'
        },
        {
          name: 'Azul Medio',
          data: [5, 4, 6],
          type: 'column',
          color: '#4682B4'
        },
        {
          name: 'Azul Claro Pastel',
          data: [3, 2, 4],
          type: 'column',
          color: '#B0E0E6'
        }
      ]
    });
  }
}
