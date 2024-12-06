// services/presupuesto.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import { 
    PresupuestoParams, 
    ApiResponse,
    DatosTarjeta,
    FlujoSaldo,
    GastosSaldo,
    PorcentajeEjecucion,
    PresupuestoComprometido,
    PresupuestoEjecutado,
    PresupuestoGastos,
    PresupuestoVigente,
    AnioEjecucion
} from '../models/presupuesto-data.model';

@Injectable({
    providedIn: 'root'
})
export class PresupuestoService {
    private baseUrl = `${environmentdb.apidb}/presupuesto`;

    constructor(private http: HttpClient) {
        console.log('PresupuestoService inicializado con URL:', this.baseUrl);
    }

    obtenerDatosTarjetas(params: PresupuestoParams): Observable<ApiResponse<DatosTarjeta[]>> {
        const url = `${this.baseUrl}/obtenerDatosTarjetas`;
        return this.http.post<ApiResponse<DatosTarjeta[]>>(url, params);
    }

    obtenerFlujoSaldo(params: PresupuestoParams): Observable<ApiResponse<FlujoSaldo>> {
        const url = `${this.baseUrl}/obtenerFlujoSaldo`;
        return this.http.post<ApiResponse<FlujoSaldo>>(url, params);
    }

    obtenerGastosVsSaldo(params: PresupuestoParams): Observable<ApiResponse<GastosSaldo[]>> {
        const url = `${this.baseUrl}/obtenerGastosVsSaldo`;
        return this.http.post<ApiResponse<GastosSaldo[]>>(url, params);
    }

    obtenerPorcentajeEjecucionVsSaldo(params: PresupuestoParams): Observable<ApiResponse<PorcentajeEjecucion[]>> {
        const url = `${this.baseUrl}/obtenerPorcentajeEjecucionVsSaldo`;
        return this.http.post<ApiResponse<PorcentajeEjecucion[]>>(url, params);
    }

    obtenerPresupuestoComprometidoVsEjecutado(params: PresupuestoParams): Observable<ApiResponse<PresupuestoComprometido[]>> {
        const url = `${this.baseUrl}/obtenerPresupuestoComprometidoVsEjecutado`;
        return this.http.post<ApiResponse<PresupuestoComprometido[]>>(url, params);
    }

    obtenerPresupuestoVsEjecutado(params: PresupuestoParams): Observable<ApiResponse<PresupuestoEjecutado[]>> {
        const url = `${this.baseUrl}/obtenerPresupuestoVsEjecutado`;
        return this.http.post<ApiResponse<PresupuestoEjecutado[]>>(url, params);
    }

    obtenerPresupuestoVsGastos(params: PresupuestoParams): Observable<ApiResponse<PresupuestoGastos[]>> {
        const url = `${this.baseUrl}/obtenerPresupuestoVsGastos`;
        return this.http.post<ApiResponse<PresupuestoGastos[]>>(url, params);
    }

    obtenerPresupuestoVigenteVsEjecutado(params: PresupuestoParams): Observable<ApiResponse<PresupuestoVigente[]>> {
        const url = `${this.baseUrl}/presupuestoVigenteVsEjecutado`;
        return this.http.post<ApiResponse<PresupuestoVigente[]>>(url, params);
    }

    obtenerAniosEjecucion(): Observable<ApiResponse<AnioEjecucion[]>> {
        const url = `${this.baseUrl}/obtenerAniosEjecucion`;
        return this.http.get<ApiResponse<AnioEjecucion[]>>(url);
    }
}