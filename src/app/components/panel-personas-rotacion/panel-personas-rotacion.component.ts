import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IndicadoresService } from '../../services/persona.service';

@Component({
  selector: 'app-panel-personas-rotacion',
  standalone: true,
  imports: [],
  templateUrl: './panel-personas-rotacion.component.html',
  styleUrl: './panel-personas-rotacion.component.css'
})
export class PanelPersonasRotacionComponent implements OnInit {
  selectedYear: number = 2023; // Año seleccionado por defecto

  constructor(private indicadoresService: IndicadoresService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onYearChange(event: Event): void {
    const year = (event.target as HTMLSelectElement).value;
    this.selectedYear = parseInt(year, 10);
    this.loadData(); // Recarga los datos cuando se cambia el año
  }

  private loadData(): void {
    // const ano = this.selectedYear;
    const mes = 1;
    const ano = 2024;
    const codigoRegion = 1;

    
    this.indicadoresService.getSemaforoIndicadores(ano).subscribe({
      next: (res) => {
          console.log('ok-------------- getSemaforoIndicadores:')
          console.log(res)
          // const { porcentajes } = res.data;
          // this.renderChartClaraOportuna('chart1', porcentajes);
      },
      error: (err) => {
        console.error('Error al cargar ----------- getSemaforoIndicadores:', err);
      },
    });
    
    this.indicadoresService.getCompararIndicadores(mes, ano).subscribe({
      next: (res) => {
          console.log('ok-------------- getCompararIndicadores:')
          console.log(res)
          // const { porcentajes } = res.data;
          // this.renderChartClaraOportuna('chart1', porcentajes);
      },
      error: (err) => {
        console.error('Error al cargar ----------- getCompararIndicadores:', err);
      },
    });

    this.indicadoresService.getTendenciaIndicadores(ano, codigoRegion).subscribe({
      next: (res) => {
          console.log('ok-------------- getTendenciaIndicadores:')
          console.log(res)
          // const { porcentajes } = res.data;
          // this.renderChartClaraOportuna('chart1', porcentajes);
      },
      error: (err) => {
        console.error('Error al cargar ----------- getTendenciaIndicadores:', err);
      },
    });

    this.indicadoresService.getObjetivoVsActual(ano, codigoRegion).subscribe({
      next: (res) => {
          console.log('ok-------------- getObjetivoVsActual:')
          console.log(res)
          // const { porcentajes } = res.data;
          // this.renderChartClaraOportuna('chart1', porcentajes);
      },
      error: (err) => {
        console.error('Error al cargar ----------- getObjetivoVsActual:', err);
      },
    });





  }
}
