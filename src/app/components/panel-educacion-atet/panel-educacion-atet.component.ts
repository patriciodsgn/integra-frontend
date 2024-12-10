import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

import { EducacionService } from '../../services/educacion.services';

HighchartsMore(Highcharts);


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
      next: (res) => this.renderPorcentajeATET(res.data),
      error: (err) => console.error('Error en getPorcentajeATET:', err),
    });

    // Chart 2: Satisfacción Geográfica
    this.educacionService.getSatisfaccionGeografica(ano, codigoRegion).subscribe({
      next: (res) => this.renderSatisfaccionGeografica(res.data),
      error: (err
        
      ) => console.error('Error en getSatisfaccionGeografica:', err),
    });
    

    this.educacionService.getPromedioSatisfaccionATET(ano, codigoRegion).subscribe({
      next: (res) => this.renderPromedioSatisfaccionATET(res.data),
      error: (err) => console.error('Error al cargar Promedio Satisfacción ATET:', err),
    });
    
    // this.educacionService.getPromedioSatisfaccionATET(ano, codigoRegion).subscribe({
    //   next: (res) => {        
    //     console.log('\x1b[36m%s\x1b[0m', 'aaaaaaaa---------------');
    //     console.log('\x1b[36m%s\x1b[0m', 'getPromedioSatisfaccionATET')
    //     console.log(res.data)
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar getPromedioSatisfaccionATET:', err);
    //   },
    // });

 



  }





  private renderPorcentajeATET(data: any): void {
    if (!data || data.length === 0) {
      console.error('No hay datos para el gráfico de Porcentaje ATET.');
      return;
    }
  
    Highcharts.chart('chart1', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Porcentaje ATET',
      },
      tooltip: {
        pointFormat: '<b>{point.y:.2f}%</b>', // Dos decimales en el porcentaje
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y:.2f}%', // Etiquetas con nombre y porcentaje
          },
          showInLegend: true, // Mostrar leyenda con categorías
        },
      },
      colors: [
        '#FFB6C1', '#FFCC99', '#FFDAB9', '#FFFACD', '#D8BFD8', '#E6E6FA',
        '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#98FB98', '#90EE90',
      ], // Colores pastel personalizados
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
  

  private renderPromedioSatisfaccionATET(data: any): void {
    if (!data || typeof data.promedioSatisfaccion !== 'number') {
      console.error('Datos inválidos para el gráfico de Promedio Satisfacción ATET:', data);
      return;
    }
  
    Highcharts.chart('chart2', {
      chart: {
        type: 'bar', // Barra horizontal
      },
      title: {
        text: 'Promedio de Satisfacción ATET',
      },
      xAxis: {
        categories: ['Promedio'],
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 1,
        max: 10,
        title: {
          text: 'Satisfacción (1 a 10)',
        },
        tickInterval: 1, // Mostrar números enteros
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true, // Mostrar el valor sobre la barra
          },
        },
      },
      series: [
        {
          name: 'Satisfacción',
          data: [data.promedioSatisfaccion],
          type: 'bar',
        },
      ],
      colors: ['#98FB98'], // Verde
    });
  }

  private renderSatisfaccionGeografica(data: any): void {
    if (!data || data.length === 0) {
      console.error('No hay datos para el gráfico de Satisfacción Geográfica.');
      return;
    }
  
    Highcharts.chart('chart3', {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Satisfacción Geográfica',
      },
      xAxis: {
        categories: data.map((item: any) => item.region), // Regiones como categorías en el eje X
      },
      yAxis: {
        title: {
          text: 'Promedio Satisfacción',
        },
        min: 0, // Asegura que el eje Y comience desde 0
        max: 10, // Escala máxima basada en evaluación de 1 a 10
        tickInterval: 1, // Intervalos de 1
      },
      plotOptions: {
        column: {
          colorByPoint: true, // Asigna un color único a cada columna
          dataLabels: {
            enabled: true, // Muestra el valor sobre las columnas
            format: '{y:.2f}', // Formato con dos decimales
          },
        },
      },
      colors: [
        '#FFB6C1', '#FFCC99', '#FFDAB9', '#FFFACD', '#D8BFD8', '#E6E6FA',
        '#B0E0E6', '#ADD8E6', '#87CEFA', '#87CEEB', '#98FB98', '#90EE90',
      ], // Tonos pastel personalizados
      series: [
        {
          name: 'Promedio Satisfacción',
          data: data.map((item: any) => item.promedioSatisfaccion), // Valores de promedio
          type: 'column',
        },
      ],
    });
  }
  


  


  
}

