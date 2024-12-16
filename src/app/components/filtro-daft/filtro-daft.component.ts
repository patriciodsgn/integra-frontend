
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-filtro-daft',
  templateUrl: './filtro-daft.component.html',
  styleUrls: ['./filtro-daft.component.css']
})
export class FiltroDaftComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: { type: 'column' },
    title: { text: 'Gastos de Operación' },
    xAxis: { categories: ['Rubro 1', 'Rubro 2', 'Rubro 3'] },
    yAxis: { title: { text: 'Monto ($)' } },
    series: [{ type: 'column', name: 'Operación', data: [5000, 7000, 8000] }]
  };

  constructor() {}
}
