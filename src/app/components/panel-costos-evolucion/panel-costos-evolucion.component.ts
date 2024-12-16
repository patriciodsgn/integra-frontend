import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CostoService } from '../../services/costo.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-panel-costos-evolucion',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './panel-costos-evolucion.component.html',
  styleUrls: ['./panel-costos-evolucion.component.css']
})
export class PanelCostosEvolucionComponent implements OnInit {

  years: number[] = [2023, 2024];
  selectedYear: number = 2024;
  
  Highcharts: typeof Highcharts = Highcharts; // Referencia a Highcharts
  chartOptions1: Highcharts.Options = {}; // Configuración del gráfico 1
  chartOptions2: Highcharts.Options = {}; // Configuración del gráfico 2

  constructor(private costoService: CostoService) {}

  ngOnInit(): void {
    this.loadCostEvolutionData(this.selectedYear); // Carga inicial del gráfico de evolución
    this.loadComparativoCMMData(); // Carga inicial del gráfico de comparativo CMM
  }

  // Método que se llama al cambiar el año en el filtro
  onYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedYear = Number(target.value); // Actualiza el año seleccionado
    this.loadCostEvolutionData(this.selectedYear); // Recarga los datos para el gráfico 1
  }

  // Cargar datos para el gráfico de costos por año
  private loadCostEvolutionData(year: number): void {
    this.costoService.getCostEvolution(year).subscribe({
      next: (res) => {
        console.log(`Datos recibidos para el año ${year}:`, res.data);
        if (res.data && res.data.length > 0) {
          this.renderCostEvolutionChart(res.data);
        } else {
          console.error('No se encontraron datos para el gráfico de costos por tipo de administración.');
        }
      },
      error: (err) => {
        console.error(`Error al cargar datos para el año ${year}:`, err);
      }
    });
  }

  // Cargar datos para el gráfico comparativo CMM
  private loadComparativoCMMData(): void {
    this.costoService.getComparativoCMMRegional().subscribe({
      next: (res) => {
        console.log('Datos del comparativo CMM:', res);
        // if (res.data && res.data.length > 0) {
        //   this.renderComparativoCMMChart(res.data);
        // } else {
        //   console.error('No se encontraron datos para el gráfico comparativo CMM.');
        // }
      },
      error: (err) => {
        console.error('Error al obtener datos del comparativo CMM:', err);
      }
    });
  }

  // Renderizar el gráfico de costos por tipo de administración
  private renderCostEvolutionChart(data: any[]): void {
    this.chartOptions1 = {
      chart: {
        type: 'bar',
        renderTo: 'chart1',
      },
      title: {
        text: `Costos por Tipo de Administración - ${data[0]?.Periodo || 'Sin Período'}`
      },
      xAxis: {
        categories: data.map(item => item.TipoAdministracion),
        title: { text: 'Tipo de Administración' }
      },
      yAxis: {
        min: 0,
        title: { text: 'Monto Total (Miles)', align: 'high' },
        labels: { overflow: 'justify' }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            format: '{point.y:,.0f}'
          }
        }
      },
      series: [
        {
          type: 'bar',
          name: 'Monto Total (Miles)',
          data: data.map(item => ({
            name: item.TipoAdministracion,
            y: item.MontoTotalMiles
          }))
        }
      ],
      credits: { enabled: false }
    };

    Highcharts.chart('chart1', this.chartOptions1);
  }

  // Renderizar el gráfico comparativo CMM
  private renderComparativoCMMChart(data: any[]): void {
    // Agrupar datos por año
    const data2023 = data.filter(item => item.Ano === 2023);
    const data2024 = data.filter(item => item.Ano === 2024);

    this.chartOptions2 = {
      chart: {
        type: 'bar',
        renderTo: 'chart2',
      },
      title: {
        text: 'Comparativo CMM por Región (2023 vs 2024)'
      },
      xAxis: {
        categories: data2023.map(item => item.NombreRegion),
        title: { text: 'Regiones' }
      },
      yAxis: {
        min: 0,
        title: { text: 'Promedio CMM' },
        labels: { overflow: 'justify' }
      },
      plotOptions: {
        bar: {
          dataLabels: { enabled: true, format: '{point.y:,.0f}' }
        }
      },
      series: [
        {
          type: 'bar',
          name: '2023',
          data: data2023.map(item => item.PromedioCMM)
        },
        {
          type: 'bar',
          name: '2024',
          data: data2024.map(item => item.PromedioCMM)
        }
      ],
      credits: { enabled: false }
    };

    Highcharts.chart('chart2', this.chartOptions2);
  }
}
