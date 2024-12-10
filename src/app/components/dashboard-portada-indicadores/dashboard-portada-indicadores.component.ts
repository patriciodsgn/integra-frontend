import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts3D from 'highcharts/highcharts-3d';

HighchartsMore(Highcharts);
Highcharts3D(Highcharts);

@Component({
  selector: 'app-dashboard-portada-indicadores',
  templateUrl: './dashboard-portada-indicadores.component.html',
  styleUrls: ['./dashboard-portada-indicadores.component.css']
})
export class DashboardPortadaIndicadoresComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  
  // Configuración base para gráficos
  private baseChartConfig = {
    credits: { enabled: false },
    title: { text: '' },
    chart: {
      marginRight: 10,
      marginLeft: 10,
      backgroundColor: 'transparent',
      height: '100%'
    }
  };

  diagnosticoNutricionalOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        innerSize: '60%', // Tamaño del radio interno de la dona
        depth: 45,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%',
          distance: 15,
          style: {
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#333',
            textOutline: 'none',
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Diagnóstico Nutricional',
        data: [
          { name: 'Normal', y: 55.0, color: '#82d68d' },
          { name: 'Sobrepeso', y: 26.0, color: '#fcd86f' },
          { name: 'Obesidad', y: 11.0, color: '#FFCC99' },
          { name: 'Riesgo de Desnutrición', y: 6.0, color: '#FFB6C1' },
          { name: 'Desnutrición', y: 2.0, color: '#FFDAB9' },
        ],
      },
    ],
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    credits: {
      enabled: false,
    },
  };

  necesidadesEducativasOptions: Highcharts.Options = {
    ...this.baseChartConfig,
    chart: {
      ...this.baseChartConfig.chart,
      type: 'column',
      options3d: { enabled: true, alpha: 15, beta: 15, depth: 30 }
    },
    xAxis: {
      categories: ['NEE Permanente', 'NEE Transitoria', 'NEE Rezago'],
      labels: { style: { fontSize: '11px' } }
    },
    yAxis: {
      title: { text: '' },
      labels: { style: { fontSize: '11px' } }
    },
    plotOptions: {
      column: {
        depth: 25,
        colorByPoint: true
      }
    },
    series: [{
      type: 'column',
      data: [56.8, 20.5, 22.7],
      colors: ['#FFCC99', '#90EE90', '#fcd86f']
    }],
    credits: {
      enabled: false,
    }
  };

  infraestructuraOptions: Highcharts.Options = {
    ...this.baseChartConfig,
    chart: {
      ...this.baseChartConfig.chart,
      type: 'column',
      options3d: { enabled: true, alpha: 10, beta: 10, depth: 20 }
    },
    xAxis: {
      categories: ['Reconocimiento Oficial', 'Sellos Verdes'],
      labels: { style: { fontSize: '11px' } }
    },
    series: [{
      type: 'column',
      data: [4.1, 46.0],
      color: '#FFCC99'
    }],
    credits: {
      enabled: false,
    }
  };

  seguridadOptions: Highcharts.Options = {
    ...this.baseChartConfig,
    chart: {
      ...this.baseChartConfig.chart,
      type: 'column',
      options3d: { enabled: true, alpha: 10, beta: 10, depth: 20 }
    },
    xAxis: {
      categories: ['2022', '2023'],
      labels: { style: { fontSize: '11px' } }
    },
    plotOptions: {
      column: {
        depth: 25
      }
    },
    series: [{
      type: 'column',
      data: [27000, 30000],
      color: '#FFCC99'
    }],
    credits: {
      enabled: false,
    }
  };

  educacionOptions: Highcharts.Options = {
    ...this.baseChartConfig,
    chart: {
      ...this.baseChartConfig.chart,
      type: 'pie',
      options3d: { enabled: true, alpha: 45 }
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        depth: 30,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%',
          style: { fontSize: '11px' }
        }
      }
    },
    series: [{
      type: 'pie',
      data: [
        { name: 'Prof. Desarrollo', y: 26.6, color: '#FFCC99' },
        { name: 'Asesor Técnico', y: 28.4, color: '#90EE90' },
        { name: 'Prof. Familia', y: 17.7, color: '#fcd86f' },
        { name: 'Prof. Inclusión', y: 27.2, color: '#D8BFD8' }
      ]
    }],
    credits: {
      enabled: false,
    }
  };

  ubicacionOptions: Highcharts.Options = {
    ...this.baseChartConfig,
    chart: {
      ...this.baseChartConfig.chart,
      type: 'column',
      options3d: { enabled: true, alpha: 15, beta: 15, depth: 30 }
    },
    xAxis: {
      categories: ['Urbano', 'Rural'],
      labels: { style: { fontSize: '11px' } }
    },
    series: [{
      type: 'column',
      data: [75, 25],
      color: '#90EE90',
    }],
    credits: {
      enabled: false,
    }
  };
  
  satisfactionGaugeOptions: Highcharts.Options = {
    chart: {
      type: 'solidgauge',
      height: '100%',
      backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },
    pane: {
      center: ['50%', '85%'],
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: [{
        innerRadius: '60%', // Ajuste aquí
        outerRadius: '100%', // Ajuste aquí
        shape: 'arc',
        backgroundColor: '#D8BFD800', // Color pastel para el área restante
      }]
    },
    tooltip: {
      enabled: false
    },
    yAxis: {
      min: 0,
      max: 100,
      stops: [
        [0.1, '#FFB6C1'], // Rojo para valores bajos
        [0.5, '#fcd86f'], // Amarillo para valores medios
        [0.9, '#82d68d']  // Verde para valores altos
      ],
      lineWidth: 0,
      tickWidth: 0,
      tickAmount: 2,
      title: {
        y: -70
      },
      labels: {
        y: 16
      }
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: -30,
          borderWidth: 0,
          useHTML: true,
          format: '<div style="text-align:center"><span style="font-size:1.5em; color: #82d68d">{y}%</span><br/><span style="font-size:0.75em; color: #666">Satisfacción</span></div>'
        }
      }
    },
    series: [{
      type: 'solidgauge',
      name: 'Satisfacción',
      data: [93], // Valor actual de satisfacción
      dataLabels: {
        format: '<div style="text-align:center"><span style="font-size:2em; color: #82d68d">{y}%</span></div>'
      }
    }],
    credits: {
      enabled: false,
    }
  };

  ngOnInit(): void {}
}











// private pastelColors = [
//   '#FFB6C1', '#FFCC99', '#FFDAB9', '#fcd86f', '#D8BFD8', '#E6E6FA',
//   '#B0E0E6', '#ADD8E6', '#FFCC99', '#87CEEB', '#82d68d', '#90EE90',
// ];
// colors: this.pastelColors,
