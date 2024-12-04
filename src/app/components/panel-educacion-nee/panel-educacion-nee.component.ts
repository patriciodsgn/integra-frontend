import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EducacionService } from '../../services/educacion.services';

@Component({
  selector: 'app-panel-educacion-nee',
  standalone: true,
  templateUrl: './panel-educacion-nee.component.html',
  styleUrls: ['./panel-educacion-nee.component.css'],
})

export class PanelEducacionNeeComponent implements OnInit {
  constructor(private educacionService: EducacionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    // Gráfico 1: Porcentaje NEE (getGraficoNEE)
    this.educacionService.getGraficoNEE(ano, codigoRegion).subscribe({
      next: (res) => this.renderPieChart('chart1', 'Distribución NEE', res.data),
      error: (err) => console.error('Error en getGraficoNEE:', err),
    });

    // Gráfico 2: Porcentaje Permanente por Región (getPorcentajePermanente)
    this.educacionService.getPorcentajePermanente(ano, codigoRegion).subscribe({
      next: (res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          console.log('Datos recibidos:', res.data); // Verifica la estructura en consola
          const comunas = res.data.map((item) => item.Comuna || 'Sin Nombre');
          const porcentajes = res.data.map((item) => item.PorcentajePermanente || 0);
          this.renderHorizontalColumnChart('chart2', 'Porcentaje Permanente por Región', comunas, porcentajes);
        } else {
          console.error('Datos inválidos o vacíos para Porcentaje Permanente:', res);
        }
      },
      error: (err) => console.error('Error en getPorcentajePermanente:', err),
    });

    // Gráfico 3: Necesidades por Comuna (getNecesidadesPorComuna)
    this.educacionService.getNecesidadesPorComuna(ano, codigoRegion).subscribe({
      next: (res) => {
        console.log('----------------------------')
        console.log(res)
        if (res.success && res.data?.length > 0) {
          const categorias = res.data.map((item) => `${item.Comuna} (${item.CategoriaNEE})`);
          const cantidades = res.data.map((item) => item.Cantidad || 0);
          this.renderBarChart('chart3', 'Necesidades por Comuna', categorias, cantidades);
        } else {
          console.error('Datos inválidos o vacíos para Necesidades por Comuna:', res);
        }
      },
      error: (err) => console.error('Error en getNecesidadesPorComuna:', err),
    });

    // Gráfico 4: Resumen Necesidades (getResumenNecesidades)
    this.educacionService.getResumenNecesidades(ano, codigoRegion).subscribe({
      next: (res) => {
        if (res.permanente || res.transitoria || res.rezago) {
          this.renderPieChart('chart4', 'Resumen de Necesidades', [
            { name: 'Permanente', y: res.permanente,  color: '#5ec5d5'},
            { name: 'Transitoria', y: res.transitoria,  color: '#ec939c'},
            { name: 'Rezago', y: res.rezago,  color: '#d7d755'},
          ]);
        } else {
          console.error('Datos inválidos o vacíos para Resumen de Necesidades:', res);
        }
      },
      error: (err) => console.error('Error en getResumenNecesidades:', err),
    });
    
  }

  private renderPieChart(containerId: string, title: string, data: any[]): void {
    if (!data || data.length === 0) {
      console.error('Datos inválidos para el gráfico Pie:', data);
      return;
    }

    Highcharts.chart(containerId, {
      chart: { type: 'pie' },
      title: { text: title },
      tooltip: { pointFormat: '<b>{point.y:.2f}%</b>' },
      series: [
        {
          name: 'Porcentaje',
          data: data.map((item) => ({
            name: item.Categoria || item.name,
            y: item.Porcentaje || item.y,
            color: item.color,
          })),
          type: 'pie',
        },
      ],
    });
  }

  
  private renderHorizontalColumnChart(containerId: string, title: string, categories: string[], data: number[]): void {
    if (!categories.length || !data.length) {
      console.error('No hay datos para el gráfico de columnas horizontales:', { categories, data });
      return;
    }
  
    Highcharts.chart(containerId, {
      chart: {
        type: 'bar', // Tipo bar para columnas horizontales
        height: categories.length * 30 + 100, // Ajusta la altura según el número de categorías
      },
      title: { text: title },
      xAxis: {
        categories,
        title: { text: 'Categorías' },
        labels: {
          style: { fontSize: '12px' }, // Ajusta tamaño para etiquetas largas
        },
      },
      yAxis: {
        min: 0,
        title: { text: 'Porcentaje' },
      },
      tooltip: {
        pointFormat: '<b>{point.y:.2f}%</b>',
      },
      series: [
        {
          name: 'Porcentaje',
          data,
          type: 'bar',
        },
      ],
      credits: { enabled: false }, // Desactiva créditos de Highcharts
      exporting: { enabled: false }, // Desactiva exportación
    });
  }
  
    
  private renderBarChart(containerId: string, title: string, categories: string[], data: number[]): void {
    if (!categories.length || !data.length) {
      console.error('No hay datos para el gráfico de barras:', { categories, data });
      return;
    }
  
    Highcharts.chart(containerId, {
      chart: {
        type: 'bar',
        height: categories.length * 30 + 100, // Ajusta altura según el número de categorías
      },
      title: {
        text: title,
        style: { fontSize: '20px', fontWeight: 'bold' }, // Mejora visual del título
      },
      xAxis: {
        categories,
        title: { text: 'Categorías' },
        labels: {
          style: { fontSize: '12px' }, // Ajuste para etiquetas largas
        },
      },
      yAxis: {
        min: 0,
        title: { text: 'Cantidad' },
        labels: {
          formatter: function () {
            return `${this.value}`; // Muestra valores numéricos
          },
        },
      },
      tooltip: {
        pointFormat: '<b>{point.y} unidades</b>', // Tooltip personalizado
      },
      series: [
        {
          name: 'Cantidad',
          data,
          type: 'bar',
        },
      ],
      credits: { enabled: false }, // Desactiva créditos
      exporting: { enabled: false }, // Desactiva exportación
    });
  }
  
}
