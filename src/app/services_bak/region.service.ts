import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import { Region } from '../models/region-data.model'; // Importa el modelo



@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private apiUrl = `${environmentdb.apidb}/regiones/tbRegion`;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> { // Cambiamos el tipo de retorno
    return this.http.get<Region[]>(this.apiUrl);
  }

  setRegion(regionId: number) {
    console.log('Región seleccionada:', regionId);
  }
}
export class RegionIntegraService {
    private apiUrl = `${environmentdb.apidb}/regiones/tbRegionIntegra`;
  
    constructor(private http: HttpClient) {}
  
    getRegionsintegra(): Observable<Region[]> { // Cambiamos el tipo de retorno
      return this.http.get<Region[]>(this.apiUrl);
    }
  
    setRegionintegra(regionId: number) {
      console.log('Región seleccionada:', regionId);
    }
  }
  