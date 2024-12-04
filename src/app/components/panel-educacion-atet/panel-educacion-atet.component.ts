import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EducacionService } from '../../services/educacion.services';

@Component({
  selector: 'app-panel-educacion-atet',
  standalone: true,
  templateUrl: './panel-educacion-atet.component.html',
  styleUrls: ['./panel-educacion-atet.component.css']
})
export class PanelEducacionAtetComponent implements OnInit {
  constructor(private educacionService: EducacionService) {}

  ngOnInit(): void {
    setTimeout(() => {
      // Esto asegura que los elementos del DOM existan antes de renderizar los gráficos
      this.loadData();
    }, 0);
  }

  private loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    // Chart 1: Porcentaje ATET
    this.educacionService.getPorcentajeATET(ano, codigoRegion).subscribe({
      next: (res) => this.renderPorcentajeATET(res),
      error: (err) => console.error('Error en getPorcentajeATET:', err),
    });

    // Chart 2: Satisfacción Geográfica
    this.educacionService.getSatisfaccionGeografica(ano, codigoRegion).subscribe({
      next: (res) => this.renderSatisfaccionGeografica(res.data),
      error: (err) => console.error('Error en getSatisfaccionGeografica:', err),
    });
  }

  private renderPorcentajeATET(data: any): void {
    if (!data || data.length === 0) {
      console.error('No hay datos para el gráfico de Porcentaje ATET.');
      return;
    }

    Highcharts.chart('chart1', {
      chart: { type: 'pie' },
      title: { text: 'Porcentaje ATET' },
      tooltip: { pointFormat: '<b>{point.y}%</b>' },
      series: [
        {
          name: 'Porcentaje',
          data: data.map((item: any) => ({
            name: item.Categoria,
            y: item.Porcentaje,
          })),
          type: 'pie',
        },
      ],
    });
  }

  private renderSatisfaccionGeografica(data: any): void {
    if (!data || data.length === 0) {
      console.error('No hay datos para el gráfico de Satisfacción Geográfica.');
      return;
    }

    Highcharts.chart('chart2', {
      chart: { type: 'column' },
      title: { text: 'Satisfacción Geográfica' },
      xAxis: { categories: data.map((item: any) => item.region) },
      yAxis: { title: { text: 'Promedio Satisfacción' } },
      series: [
        {
          name: 'Promedio Satisfacción',
          data: data.map((item: any) => item.promedioSatisfaccion),
          type: 'column',
        },
      ],
    });
  }
}
