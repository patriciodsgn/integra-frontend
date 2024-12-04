import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MAP_CONFIG } from '../config/map-config';
import { REGION_COLORS } from '../config/map-config';

@Injectable({
  providedIn: 'root'
})
export class MapConfigService {
  getTooltipConfig() {
    return {
      enabled: true,
      useHTML: true,
      headerFormat: '',
      pointFormat: `
        <div style="
          padding: 10px;
          font-family: ${MAP_CONFIG.style.fontFamily};
          min-width: 150px;">
          <div style="
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;">
            {point.name}
          </div>
          <div style="
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;">
            Código Comuna: {point.codigoComuna}
          </div>
          <div style="
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;">
            Total Jardines: {point.cantidadJardines}
          </div>
        </div>
      `,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#cccccc',
      shadow: true
    };
  }

  getMapOptions(region: string, mapData: any, seriesData: any): Highcharts.Options {
    return {
      chart: {
        map: mapData,
        backgroundColor: '#ffffff',
        height: '100%',
        style: {
          fontFamily: MAP_CONFIG.style.fontFamily
        },
        panning: {
          enabled: true,
          type: 'xy'
        }
      },
      mapView: {
        zoom: MAP_CONFIG.zoom.initial,
        projection: {
          name: undefined
        }
      },
      title: {
        text: 'Mapa de ' + region,
        style: {
          fontSize: MAP_CONFIG.style.fontSize.title,
          fontWeight: 'bold'
        }
      },
      subtitle: {
        text: 'Click y arrastra para mover el mapa, usa +/- para zoom',
        style: {
          fontSize: MAP_CONFIG.style.fontSize.subtitle,
          color: '#666666'
        }
      },
      mapNavigation: {
        enabled: true,
        enableButtons: true,
        enableDoubleClickZoom: true,
        enableMouseWheelZoom: true,
        enableTouchZoom: true,
        mouseWheelSensitivity: MAP_CONFIG.zoom.sensitivity,
        buttons: {
          zoomIn: {
            text: '+'
          },
          zoomOut: {
            text: '-'
          }
        }
      },
      colorAxis: [{
        min: 0,
        max: 100,
        minColor: MAP_CONFIG.colors.minColor,
        maxColor: MAP_CONFIG.colors.maxColor,
        showInLegend: true
      }],
      legend: {
        enabled: true,
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        title: {
          text: 'Valores'
        }
      },
      tooltip: this.getTooltipConfig(),
      series: [{
        type: 'map',
        name: 'Comunas',
        states: {
          hover: {
            brightness: 0.1,
            borderColor: MAP_CONFIG.colors.hoverBorderColor,
            borderWidth: 2
          }
        },
        dataLabels: {
          enabled: false
        },
        data: seriesData,
        joinBy: ['Comuna', 'hc-key'],
        events: {
          click: (e: Highcharts.SeriesClickEventObject) => {
            if (e.point) {
              console.log('Comuna seleccionada:', {
                nombre: e.point.name,
                codigo: (e.point as any).codigoComuna,
                jardines: (e.point as any).cantidadJardines
              });
            }
          }
        }
      } as any]
    };
  }

  getRegionColors(region: string) {
    return REGION_COLORS[region] || {};
  }
}