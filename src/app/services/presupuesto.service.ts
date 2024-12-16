import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
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

    private handleError(error: HttpErrorResponse) {
        console.error('Error en la petición:', {
            status: error.status,
            message: error.message,
            error: error.error
        });
        
        return throwError(() => ({
            success: false,
            message: error.error?.message || 'Error en la operación',
            error: error.error
        }));
    }

    obtenerDatosTarjetas(params: PresupuestoParams): Observable<ApiResponse<DatosTarjeta[]>> {
        const url = `${this.baseUrl}/obtenerDatosTarjetas`;
        return this.http.post<ApiResponse<DatosTarjeta[]>>(url, params).pipe(
            catchError(this.handleError)
        );
    }

    obtenerFlujoSaldo(params: PresupuestoParams): Observable<ApiResponse<FlujoSaldo>> {
        const url = `${this.baseUrl}/obtenerFlujoSaldo`;
        return this.http.post<ApiResponse<FlujoSaldo>>(url, params).pipe(
            catchError(this.handleError)
        );
    }

    obtenerGastosVsSaldo(params: PresupuestoParams): Observable<ApiResponse<GastosSaldo[]>> {
        const url = `${this.baseUrl}/obtenerGastosVsSaldo`;
        return this.http.post<ApiResponse<GastosSaldo[]>>(url, params).pipe(
            catchError(this.handleError)
        );
    }

    obtenerPorcentajeEjecucionVsSaldo(params: PresupuestoParams): Observable<ApiResponse<PorcentajeEjecucion[]>> {
        const url = `${this.baseUrl}/obtenerPorcentajeEjecucionVsSaldo`;
        return this.http.post<ApiResponse<PorcentajeEjecucion[]>>(url, params).pipe(
            catchError(this.handleError)
        );
    }

    obtenerPresupuestoComprometidoVsEjecutado(params: PresupuestoParams): Observable<ApiResponse<PresupuestoComprometido[]>> {
        const url = `${this.baseUrl}/obtenerPresupuestoComprometidoVsEjecutado`;
        console.log('=== obtenerPresupuestoComprometidoVsEjecutado ===');
        console.log('URL:', url);
        console.log('Params:', params);

        return this.http.post<ApiResponse<PresupuestoComprometido[]>>(url, params).pipe(
            catchError(this.handleError)
        );
    }

    obtenerPresupuestoVsEjecutado(params: PresupuestoParams): Observable<ApiResponse<PresupuestoEjecutado[]>> {
        const url = `${this.baseUrl}/obtenerPresupuestoVsEjecutado`;
        
        const queryParams = {
            ano: params.ano?.toString() || new Date().getFullYear().toString(),
            nombredireccion: params.nombredireccion || "",
            rubro: params.rubro || "",
            subrubro: params.subrubro || ""
        };
        
        console.log('=== obtenerPresupuestoVsEjecutado ===');
        console.log('URL:', url);
        console.log('Query Params:', queryParams);
        
        return this.http.get<ApiResponse<PresupuestoEjecutado[]>>(url, {
            params: queryParams as any
        }).pipe(
            map(response => ({
                success: response.success,
                data: response.data,
                message: response.message
            })),
            tap(response => {
                console.log('Response from obtenerPresupuestoVsEjecutado:', {
                    success: response.success,
                    dataLength: response.data?.length || 0,
                    message: response.message
                });
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error in obtenerPresupuestoVsEjecutado:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                
                return throwError(() => ({
                    success: false,
                    message: error.error?.message || 'Error al obtener datos de presupuesto',
                    error: error.error
                }));
            })
        );
    }

    obtenerPresupuestoVsGastos(params: PresupuestoParams): Observable<ApiResponse<PresupuestoGastos[]>> {
        const url = `${this.baseUrl}/obtenerPresupuestoVsGastos`;
        return this.http.post<ApiResponse<PresupuestoGastos[]>>(url, params).pipe(
            catchError(this.handleError)
        );
    }

    obtenerPresupuestoVigenteVsEjecutado(params: PresupuestoParams): Observable<ApiResponse<PresupuestoVigente[]>> {
        const url = `${this.baseUrl}/presupuestoVigenteVsEjecutado`;
        return this.http.post<ApiResponse<PresupuestoVigente[]>>(url, params).pipe(
            catchError(this.handleError)
        );
    }

    obtenerAniosEjecucion(): Observable<ApiResponse<AnioEjecucion[]>> {
        const url = `${this.baseUrl}/obtenerAniosEjecucion`;
        return this.http.get<ApiResponse<AnioEjecucion[]>>(url).pipe(
            catchError(this.handleError)
        );
    }
}