import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CostoService } from '../../services/costo.service';

@Component({
  selector: 'app-panel-costos-evolucion',
  standalone: true,
  imports: [],
  templateUrl: './panel-costos-evolucion.component.html',
  styleUrls: ['./panel-costos-evolucion.component.css']
})
export class PanelCostosEvolucionComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts; // Referencia a Highcharts
  chartOptions: Highcharts.Options = {}; // Configuración inicial del gráfico
  selectedYear: number = 2023; // Año seleccionado por defecto

  constructor(private costoService: CostoService) {}

  ngOnInit(): void {
    this.loadData(this.selectedYear); // Carga inicial con el año por defecto
  }

  // Método que se llama al cambiar el año en el filtro
  onYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedYear = Number(target.value); // Actualiza el año seleccionado
    this.loadData(this.selectedYear); // Recarga los datos para el año seleccionado
  }

  private loadData(year: number): void {
    this.costoService.getCostEvolution(year).subscribe({
      next: (res) => {
        console.log(`Datos recibidos para el año ${year}:`, res.data);

        if (res.data && res.data.length > 0) {
          // Renderiza el gráfico con los datos recibidos
          this.renderChart(res.data);
        } else {
          console.error('No se encontraron datos para renderizar el gráfico.');
        }
      },
      error: (err) => {
        console.error(`Error al cargar datos para el año ${year}:`, err);
      }
    });
  }

  private renderChart(data: any[]): void {
    this.chartOptions = {
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
        title: {
          text: 'Monto Total (Miles)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
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
      credits: {
        enabled: false
      }
    };

    Highcharts.chart('chart1', this.chartOptions);
  }
}
