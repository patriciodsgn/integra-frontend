import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Histogram from 'highcharts/modules/histogram-bellcurve'; // Importa el módulo de histogramas

// Inicializa el módulo
Histogram(Highcharts);

@Component({
  selector: 'app-elem-draw-02',
  standalone: true,
  templateUrl: './elem-draw-02.component.html',
  styleUrls: ['./elem-draw-02.component.css']
})
export class ElemDraw02Component implements AfterViewInit {

  ngAfterViewInit(): void {
    this.renderHistogram();
  }

  renderHistogram(): void {
    Highcharts.chart('chart-container-02', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Porcentaje de niños y niñas con Necesidades Educativas Especiales (NEE)'
      },
      xAxis: {
        title: {
          text: 'Eje de las Ordenadas'
        }
      },
      yAxis: {
        title: {
          text: 'Eje de las Abscisas'
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 1,
          color: '#87CEEB', // Azul claro
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [
        {
          name: 'Distribución',
          type: 'column',
          data: [10, 15, 30, 50, 40, 25, 15, 5] // Datos simulados para el histograma
        }
      ]
    });
  }
}
