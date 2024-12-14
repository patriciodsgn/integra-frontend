// src/app/shared/highcharts-config.ts
import * as Highcharts from 'highcharts';

export function configureHighcharts() {
  Highcharts.setOptions({
    lang: {
      loading: 'Cargando...',
      viewFullscreen: 'Ver en pantalla completa',
      exitFullscreen: 'Salir de pantalla completa',
      downloadPNG: 'Descargar como PNG',
      downloadJPEG: 'Descargar como JPEG',
      downloadPDF: 'Descargar como PDF',
      downloadSVG: 'Descargar como SVG',
      printChart: 'Imprimir gráfico',
      contextButtonTitle: 'Opciones de exportación',
      noData: 'No hay datos para mostrar'
    }
  });
}
