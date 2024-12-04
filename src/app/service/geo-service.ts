import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GeoData {
  idNuevo: number;
  nombre: string;
  lat: number;
  long: number;
  region: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDatosGeo(params?: {
    idNuevo?: number;
    region?: number;
    nombre?: string;
  }): Observable<ApiResponse<GeoData[]>> {
    let httpParams = new HttpParams();
    
    if (params?.idNuevo) {
      httpParams = httpParams.set('idNuevo', params.idNuevo.toString());
    }
    if (params?.region) {
      httpParams = httpParams.set('region', params.region.toString());
    }
    if (params?.nombre) {
      httpParams = httpParams.set('nombre', params.nombre);
    }

    return this.http.get<ApiResponse<GeoData[]>>(`${this.apiUrl}/GetDatosGeo`, { params: httpParams });
  }
}
