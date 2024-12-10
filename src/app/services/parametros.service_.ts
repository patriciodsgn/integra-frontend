// services/parametros.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import {
    ApiResponse,
    DireccionParams,
    SubRubroParams,
    Direccion,
    SubRubro,
    Rubro
} from '../models/parametros-data.models';

@Injectable({
    providedIn: 'root'
})
export class ParametrosService {
    private baseUrl = `${environmentdb.apidb}/parametros`;

    constructor(private http: HttpClient) {
        console.log('ParametrosService inicializado con URL:', this.baseUrl);
    }

    obtenerDirecciones(params?: DireccionParams): Observable<ApiResponse<Direccion[]>> {
        return this.http.post<ApiResponse<Direccion[]>>(
            `${this.baseUrl}/obtenerDirecciones`,
            params || {}
        );
    }

    obtenerSubRubros(params: SubRubroParams): Observable<ApiResponse<SubRubro[]>> {
        return this.http.post<ApiResponse<SubRubro[]>>(
            `${this.baseUrl}/obtenerSubRubros`,
            params
        );
    }

    obtenerTodosLosRubros(): Observable<ApiResponse<Rubro[]>> {
        return this.http.get<ApiResponse<Rubro[]>>(
            `${this.baseUrl}/obtenerTodosLosRubros`
        );
    }
}