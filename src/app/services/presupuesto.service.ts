import { Injectable } from '@angular/core';
import { map, retry, shareReplay, timeout, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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
    private cachedAnios$: Observable<ApiResponse<AnioEjecucion[]>> | null = null;

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
        
        const queryParams = {
            ano: params.ano?.toString() || new Date().getFullYear().toString(),
            nombredireccion: params.nombredireccion || "",
            rubro: params.rubro || "",
            subrubro: params.subrubro || ""
        };
     
        console.log('=== obtenerDatosTarjetas ===');
        console.log('URL:', url);
        console.log('Query Params:', queryParams);
        
        return this.http.get<ApiResponse<DatosTarjeta[]>>(url, {
            params: queryParams as any
        }).pipe(
            tap(response => {
                console.log('Response from obtenerDatosTarjetas:', {
                    success: response.success,
                    dataLength: response.data?.length || 0,
                    message: response.message
                });
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error in obtenerDatosTarjetas:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                return throwError(() => ({
                    success: false,
                    message: error.error?.message || 'Error al obtener datos de tarjetas',
                    error: error.error
                }));
            })
        );
    }

    obtenerFlujoSaldo(params: PresupuestoParams): Observable<ApiResponse<FlujoSaldo>> {
        const url = `${this.baseUrl}/obtenerFlujoSaldo`;
        
        const queryParams = {
            ano: params.ano?.toString() || new Date().getFullYear().toString(),
            nombredireccion: params.nombredireccion || "",
            rubro: params.rubro || "",
            subrubro: params.subrubro || ""
        };
        
        console.log('=== obtenerFlujoSaldo ===');
        console.log('URL:', url);
        console.log('Query Params:', queryParams);
        
        return this.http.get<ApiResponse<FlujoSaldo>>(url, {
            params: queryParams as any
        }).pipe(
            tap(response => {
                console.log('Response from obtenerFlujoSaldo:', {
                    success: response.success,
                    data: response.data,
                    message: response.message
                });
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error in obtenerFlujoSaldo:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                return throwError(() => ({
                    success: false,
                    message: error.error?.message || 'Error al obtener flujo de saldo',
                    error: error.error
                }));
            })
        );
     }

    obtenerGastosVsSaldo(params: PresupuestoParams): Observable<ApiResponse<GastosSaldo[]>> {
        const url = `${this.baseUrl}/obtenerGastosVsSaldo`;
        
        const queryParams = {
            ano: params.ano?.toString() || new Date().getFullYear().toString(),
            nombredireccion: params.nombredireccion || "",
            rubro: params.rubro || "",
            subrubro: params.subrubro || ""
        };
     
        console.log('=== obtenerGastosVsSaldo ===');
        console.log('URL:', url);
        console.log('Query Params:', queryParams);
        
        return this.http.get<ApiResponse<GastosSaldo[]>>(url, {
            params: queryParams as any
        }).pipe(
            tap(response => {
                console.log('Response from obtenerGastosVsSaldo:', {
                    success: response.success,
                    dataLength: response.data?.length || 0,
                    message: response.message
                });
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error in obtenerGastosVsSaldo:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                return throwError(() => ({
                    success: false,
                    message: error.error?.message || 'Error al obtener gastos vs saldo',
                    error: error.error
                }));
            })
        );
     }

     obtenerPorcentajeEjecucionVsSaldo(params: PresupuestoParams): Observable<ApiResponse<PorcentajeEjecucion[]>> {
        const url = `${this.baseUrl}/obtenerPorcentajeEjecucionVsSaldo`;
        
        const queryParams = {
            ano: params.ano?.toString() || new Date().getFullYear().toString(),
            nombredireccion: params.nombredireccion || "",
            rubro: params.rubro || "",
            subrubro: params.subrubro || ""
        };
     
        console.log('=== obtenerPorcentajeEjecucionVsSaldo ===');
        console.log('URL:', url);
        console.log('Query Params:', queryParams);
        
        return this.http.get<ApiResponse<PorcentajeEjecucion[]>>(url, {
            params: queryParams as any
        }).pipe(
            tap(response => {
                console.log('Response from obtenerPorcentajeEjecucionVsSaldo:', {
                    success: response.success,
                    dataLength: response.data?.length || 0,
                    message: response.message
                });
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error in obtenerPorcentajeEjecucionVsSaldo:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                return throwError(() => ({
                    success: false,
                    message: error.error?.message || 'Error al obtener porcentaje de ejecución vs saldo',
                    error: error.error
                }));
            })
        );
    }

    obtenerPresupuestoComprometidoVsEjecutado(params: PresupuestoParams): Observable<ApiResponse<PresupuestoComprometido[]>> {
        const url = `${this.baseUrl}/obtenerPresupuestoComprometidoVsEjecutado`;
        
        console.log('=== obtenerPresupuestoComprometidoVsEjecutado ===');
        console.log('URL:', url);
        console.log('Params:', params);
        
        return this.http.post<ApiResponse<PresupuestoComprometido[]>>(url, params).pipe(
            tap(response => {
                console.log('Response from obtenerPresupuestoComprometidoVsEjecutado:', {
                    success: response.success,
                    dataLength: response.data?.length || 0,
                    message: response.message
                });
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error in obtenerPresupuestoComprometidoVsEjecutado:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                return throwError(() => ({
                    success: false,
                    message: error.error?.message || 'Error al obtener presupuesto comprometido',
                    error: error.error
                }));
            })
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
                    message: error.error?.message || 'Error al obtener presupuesto vs ejecutado',
                    error: error.error
                }));
            })
        );
    }

    obtenerPresupuestoVsGastos(params: PresupuestoParams): Observable<ApiResponse<PresupuestoGastos[]>> {
        const url = `${this.baseUrl}/obtenerPresupuestoVsGastos`;
        
        console.log('=== obtenerPresupuestoVsGastos ===');
        console.log('URL:', url);
        console.log('Params:', params);
        
        return this.http.post<ApiResponse<PresupuestoGastos[]>>(url, params).pipe(
            tap(response => {
                console.log('Response from obtenerPresupuestoVsGastos:', {
                    success: response.success,
                    dataLength: response.data?.length || 0,
                    message: response.message
                });
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error in obtenerPresupuestoVsGastos:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                return throwError(() => ({
                    success: false,
                    message: error.error?.message || 'Error al obtener presupuesto vs gastos',
                    error: error.error
                }));
            })
        );
    }

    obtenerAniosEjecucion(forceRefresh: boolean = false): Observable<ApiResponse<AnioEjecucion[]>> {
        if (this.cachedAnios$ && !forceRefresh) {
            return this.cachedAnios$;
        }

        const url = `${this.baseUrl}/obtenerAniosEjecucion`;
        
        console.log('=== obtenerAniosEjecucion ===');
        console.log('URL:', url);
        console.log('Force Refresh:', forceRefresh);
        
        this.cachedAnios$ = this.http.get<ApiResponse<AnioEjecucion[]>>(url).pipe(
            timeout(15000),
            retry(2),
            tap(response => {
                console.log('Response from obtenerAniosEjecucion:', {
                    success: response.success,
                    dataLength: response.data?.length || 0,
                    message: response.message
                });
            }),
            map(response => {
                if (!response.success || !Array.isArray(response.data)) {
                    throw new Error(response.message || 'Formato de respuesta inválido');
                }
                return {
                    ...response,
                    data: response.data.sort((a, b) => b.Ano - a.Ano)
                };
            }),
            catchError((error: HttpErrorResponse) => {
                console.error('Error in obtenerAniosEjecucion:', {
                    status: error.status,
                    message: error.message,
                    error: error.error
                });
                return throwError(() => ({
                    success: false,
                    message: error.error?.message || 'Error al obtener años',
                    error: error.error
                }));
            }),
            shareReplay(1)
        );

        return this.cachedAnios$;
    }

    clearAniosCache(): void {
        console.log('Limpiando caché de años');
        this.cachedAnios$ = null;
    }
}