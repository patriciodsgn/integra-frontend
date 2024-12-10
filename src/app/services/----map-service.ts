import { Injectable } from '@angular/core';
import { REGION_NAMES, GEOJSON_URLS, REGION_COORDINATES } from '../config/map-config';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  getRegionNameById(regionId: number): string {
    return REGION_NAMES[regionId] || 'Desconocida';
  }

  getGeoJsonUrl(regionId: number): string {
    return GEOJSON_URLS[regionId] || '/assets/map/cl-all.geo.json';
  }

  getRegionCoordinates(region: string): [number, number] {
    return REGION_COORDINATES[region] || [0, 0];
  }

  async loadMapData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading map data:', error);
      throw error;
    }
  }
}
