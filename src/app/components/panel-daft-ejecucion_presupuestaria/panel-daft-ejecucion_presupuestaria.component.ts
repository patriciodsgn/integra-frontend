import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PresupuestoService } from '../../services/presupuesto.service';
import { ApiResponse, PresupuestoParams } from '../../models/presupuesto-data.model';
import { ParametrosService } from '../../services/parametros.service';
import { Direccion } from '../../models/parametros-data.models';

interface AnioEjecucion {
  Ano: number;
}

interface Rubro {
  Rubro: string;
  SubRubro: string;
}

interface SubRubro {
  Rubro: string;
  SubRubro: string;
}

@Component({
  selector: 'app-panel-daft-ejecucion-presupuestaria',
  standalone: true,
  imports: [HighchartsChartModule, CommonModule, FormsModule],
  templateUrl: './panel-daft-ejecucion_presupuestaria.component.html',
  styleUrl: './panel-daft-ejecucion_presupuestaria.component.css'
})
export class PanelDaftEjecucionPresupuestariaComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  
  // Estados del componente
  aniosDisponibles: number[] = [];
  anioSeleccionado: number = new Date().getFullYear();
  loading: boolean = false;
  error: string | null = null;

  // Estados para filtros
  direcciones: Direccion[] = [];
  rubros: string[] = [];
  subRubros: SubRubro[] = [];
  
  filtros = {
    direccion: '',
    rubro: '',
    subRubro: ''
  };

  // Parámetros de búsqueda
  params: PresupuestoParams = {
    ano: this.anioSeleccionado,
    nombredireccion: '',
    rubro: '',
    subrubro: ''
  };

  // Opciones de Highcharts para cada gráfico
  chartOptions1: Highcharts.Options = {
    chart: { type: 'bar' },
    title: { text: 'Presupuesto Vigente vs Ejecutado' },
    xAxis: { categories: ['Enero', 'Febrero', 'Marzo'] },
    yAxis: { title: { text: 'Monto ($)' } },
    plotOptions: { bar: { dataLabels: { enabled: true } } },
    series: [
      { type: 'bar', name: 'Vigente', data: [150, 200, 300] }, 
      { type: 'bar', name: 'Ejecutado', data: [120, 180, 250] }
    ]
  };

  chartOptions2: Highcharts.Options = {
    chart: { type: 'column' },
    title: { text: 'Presupuesto Comprometido vs Gastos Ejecutados' },
    xAxis: { categories: ['Área 1', 'Área 2', 'Área 3'] },
    yAxis: { title: { text: 'Monto ($)' } },
    plotOptions: { column: { dataLabels: { enabled: true } } },
    series: [
      { type: 'column', name: 'Comprometido', data: [400, 500, 600] }, 
      { type: 'column', name: 'Ejecutado', data: [300, 450, 500] }
    ]
  };

  chartOptions3: Highcharts.Options = {
    chart: { type: 'pie' },
    title: { text: 'Gastos Ejecutados vs Saldo por Gastar' },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Gastos',
      data: [
        { name: 'Ejecutado', y: 60 },
        { name: 'Saldo por Gastar', y: 40 }
      ]
    }]
  };

  chartOptions4: Highcharts.Options = {
    chart: { type: 'line' },
    title: { text: 'Flujo del Saldo por Ejecutar' },
    xAxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'] },
    yAxis: { title: { text: 'Saldo ($)' } },
    series: [{
      type: 'line',
      name: 'Saldo',
      data: [100, 90, 85, 70, 65, 60]
    }]
  };

  chartOptions5: Highcharts.Options = {
    chart: { type: 'column' },
    title: { text: 'Porcentaje de Ejecución vs Saldo' },
    xAxis: { categories: ['Depto 1', 'Depto 2', 'Depto 3'] },
    yAxis: {
      title: { text: 'Porcentaje (%)' },
      max: 100
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '{point.y}%'
        }
      }
    },
    series: [{
      type: 'column',
      name: 'Ejecución',
      data: [80, 90, 85]
    }]
  };

  chartOptions6: Highcharts.Options = {
    chart: { type: 'column' },
    title: { text: 'Presupuesto Vigente vs Gastos Ejecutados' },
    xAxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'] },
    yAxis: { title: { text: 'Monto ($)' } },
    plotOptions: { column: { dataLabels: { enabled: true } } },
    series: [
      { type: 'column', name: 'Vigente', data: [100, 110, 120, 130, 140, 150] },
      { type: 'column', name: 'Ejecutado', data: [90, 100, 110, 120, 125, 130] }
    ]
  };

  constructor(
    private presupuestoService: PresupuestoService,
    private parametrosService: ParametrosService
  ) {}

  ngOnInit() {
    console.log('Iniciando componente');
    this.cargarAnios();
    this.cargarDirecciones();
    this.cargarRubros();
  }

  cargarDirecciones() {
    this.parametrosService.obtenerDirecciones().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.direcciones = response.data;
          console.log('Direcciones cargadas:', this.direcciones);
        }
      },
      error: (error) => console.error('Error cargando direcciones:', error)
    });
  }

  cargarRubros() {
    this.parametrosService.obtenerTodosLosRubros().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.rubros = [...new Set(response.data.map(item => item.Rubro))];
          console.log('Rubros únicos:', this.rubros);
        }
      },
      error: (error) => console.error('Error cargando rubros:', error)
    });
  }

  onRubroChange() {
    if (!this.filtros.rubro) {
      this.subRubros = [];
      return;
    }

    this.parametrosService.obtenerTodosLosRubros().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.subRubros = response.data.filter(item => item.Rubro === this.filtros.rubro);
          console.log('SubRubros filtrados:', this.subRubros);
        }
      }
    });
  }

  cargarAnios() {
    this.presupuestoService.obtenerAniosEjecucion().subscribe({
      next: (response) => {
        if (response?.success && Array.isArray(response.data)) {
          this.aniosDisponibles = response.data
            .map(item => item.Ano)
            .sort((a, b) => b - a);
          
          if (this.aniosDisponibles.length > 0) {
            this.anioSeleccionado = this.aniosDisponibles[0];
          }
        }
      },
      error: (error) => {
        console.error('Error cargando años:', error);
        this.aniosDisponibles = [];
      }
    });
  }

  isAnioDisponible(anio: number): boolean {
    return this.aniosDisponibles.includes(anio);
  }

  seleccionarAnio(anio: number) {
    if (this.isAnioDisponible(anio)) {
      console.log(`Seleccionando año: ${anio}`);
      this.anioSeleccionado = anio;
    }
  }

  aplicarFiltros() {
    if (!this.anioSeleccionado) {
      console.warn('Debe seleccionar un año');
      return;
    }

    const params = {
      ano: this.anioSeleccionado,
      nombredireccion: this.filtros.direccion,
      rubro: this.filtros.rubro,
      subrubro: this.filtros.subRubro
    };

    console.log('Aplicando filtros con parámetros:', params);
    this.cargarDatosGraficos(params);
  }

  private cargarDatosGraficos(params: any) {
    this.loading = true;
    forkJoin({
      presupuesto: this.presupuestoService.obtenerPresupuestoVsEjecutado(params),
      gastos: this.presupuestoService.obtenerGastosVsSaldo(params),
      flujo: this.presupuestoService.obtenerFlujoSaldo(params),
      porcentaje: this.presupuestoService.obtenerPorcentajeEjecucionVsSaldo(params),
      tarjetas: this.presupuestoService.obtenerDatosTarjetas(params)
    }).subscribe({
      next: (results) => {
        console.log('Resultados de las consultas:', results);
        this.actualizarGraficos(results);
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.error = 'Error al cargar los datos';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private actualizarGraficos(results: any) {
    if (results.presupuesto?.success) {
      this.actualizarGraficoPresupuesto(results.presupuesto.data);
    }
    if (results.gastos?.success) {
      this.actualizarGraficoGastos(results.gastos.data);
    }
    if (results.flujo?.success) {
      this.actualizarGraficoFlujo(results.flujo.data);
    }
    if (results.porcentaje?.success) {
      this.actualizarGraficoPorcentaje(results.porcentaje.data);
    }
    if (results.tarjetas?.success) {
      this.actualizarTarjetas(results.tarjetas.data);
    }
  }

  private actualizarGraficoPresupuesto(data: any) {
    this.chartOptions1 = {
      ...this.chartOptions1,
      series: [
        { type: 'bar', name: 'Vigente', data: data.map((item: any) => item.presupuestoVigente) },
        { type: 'bar', name: 'Ejecutado', data: data.map((item: any) => item.presupuestoEjecutado) }
      ]
    };
  }

  private actualizarGraficoGastos(data: any) {
    this.chartOptions3 = {
      ...this.chartOptions3,
      series: [{
        type: 'pie',
        name: 'Gastos',
        data: [
          { name: 'Ejecutado', y: data.gastosEjecutados },
          { name: 'Saldo por Gastar', y: data.saldoPorGastar }
        ]
      }]
    };
  }

  private actualizarGraficoFlujo(data: any) {
    this.chartOptions4 = {
      ...this.chartOptions4,
      series: [{
        type: 'line',
        name: 'Saldo',
        data: data.map((item: any) => item.saldo)
      }]
    };
  }

  private actualizarGraficoPorcentaje(data: any) {
    this.chartOptions5 = {
      ...this.chartOptions5,
      series: [{
        type: 'column',
        name: 'Ejecución',
        data: data.map((item: any) => item.porcentajeEjecucion)
      }]
    };
  }

  private actualizarTarjetas(data: any) {
    console.log('Actualizando datos de tarjetas:', data);
    // Implementar según la estructura de tus tarjetas
  }
}