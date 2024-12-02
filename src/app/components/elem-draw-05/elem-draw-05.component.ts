import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-elem-draw-05',
  standalone: true,
  imports: [],
  templateUrl: './elem-draw-05.component.html',
  styleUrls: ['./elem-draw-05.component.css'],
})
export class ElemDraw05Component implements OnInit, AfterViewInit, OnChanges {
  @Input() ed5_value1: number = 0; // Recibe el valor desde un componente padre
  @Input() ed5_value2: number = 0; // Recibe el valor desde un componente padre
  @Input() ed5_value3: number = 0; // Recibe el valor desde un componente padre

  private chart: Highcharts.Chart | undefined;

  ngOnInit(): void {
    console.log('Valores iniciales:', {
      ed5_value1: this.ed5_value1,
      ed5_value2: this.ed5_value2,
      ed5_value3: this.ed5_value3,
    });
  }

  ngAfterViewInit(): void {
    this.renderPieChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.chart &&
      (changes['ed5_value1'] || changes['ed5_value2'] || changes['ed5_value3'])
    ) {
      this.updateChart();
    }
  }

  renderPieChart(): void {
    this.chart = Highcharts.chart({
      chart: {
        renderTo: 'chart-container-05',
        type: 'pie',
      },
      title: {
        text: '% de niños y niñas con Necesidad Educativa Especial Transitoria',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
          showInLegend: true,
        },
      },
      series: [
        {
          type: 'pie', // Aseguramos que el tipo sea explícitamente 'pie'
          name: 'Porcentaje',

          colorByPoint: true,
          data: [
            { name: 'Permanente', y: this.ed5_value1, color: '#5eead4' },
            { name: 'Transitoria', y: this.ed5_value2, color: '#facc15' },
            { name: 'Rezago', y: this.ed5_value3, color: '#fb7185' },
          ],
        } as Highcharts.SeriesOptionsType,
      ],
    });
  }

  updateChart(): void {
    if (this.chart) {
      const series = this.chart.series[0] as Highcharts.Series;
      series.setData([
        { name: 'Permanente', y: this.ed5_value1, color: '#5eead4' },
        { name: 'Transitoria', y: this.ed5_value2, color: '#facc15' },
        { name: 'Rezago', y: this.ed5_value3, color: '#fb7185' },
      ]);
    }
  }
}
