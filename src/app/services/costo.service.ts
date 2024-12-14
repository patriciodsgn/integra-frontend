import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environmentdb } from 'src/environments/environment';

// Interfaces
export interface CostEvolutionResponse {
    success: boolean;
    data: CostEvolutionData[];
    years?: number[];
    message?: string;
}

export interface CostEvolutionData {
    TipoAdministracion: string;
    Periodo: string;
    MontoTotalMiles: number;
    Ano: number;
    OrdenMuestra: number;
}

export interface ComparativoCMMResponse {
    success: boolean;
    data: ComparativoCMM[];
    message?: string;
}

export interface ComparativoCMM {
    Region: string;
    Periodo: string;
    MontoTotal: number;
    Porcentaje: number;
}

export interface ApiErrorResponse {
    success: boolean;
    error: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class CostoService {
    private baseUrl = `${environmentdb.apidb}/costos`;

    constructor(private http: HttpClient) {
        console.log('🚀 CostoService inicializado con URL:', this.baseUrl);
    }

    /**
     * Obtiene la evolución de costos para un año específico o el más reciente
     * @param year Año opcional para filtrar los datos
     */
    getCostEvolution(year?: number): Observable<CostEvolutionResponse> {
        const url = `${this.baseUrl}/evolucionCostos`;
        const params = new HttpParams().set('ano', year?.toString() || '');

        console.log('🔄 Solicitando evolución de costos:', {
            url,
            params: year ? `año=${year}` : 'año más reciente'
        });

        return this.http.get<CostEvolutionResponse>(url, { params }).pipe(
            tap(response => {
                console.log('✅ Datos de evolución recibidos:', {
                    éxito: response.success,
                    registros: response.data?.length || 0,
                    años: response.years?.join(', '),
                    muestra: response.data?.[0]
                });
            }),
            catchError(this.handleError('getCostEvolution'))
        );
    }

    /**
     * Obtiene el comparativo CMM Regional
     */
    getComparativoCMMRegional(): Observable<ComparativoCMMResponse> {
        const url = `${this.baseUrl}/comparativoCMM`;
        
        console.log('🔄 Solicitando comparativo CMM Regional');

        return this.http.get<ComparativoCMMResponse>(url).pipe(
            tap(response => {
                console.log('✅ Datos de comparativo CMM recibidos:', {
                    éxito: response.success,
                    registros: response.data?.length || 0,
                    muestra: response.data?.[0]
                });
            }),
            catchError(this.handleError('getComparativoCMMRegional'))
        );
    }

    /**
     * Manejador genérico de errores para las peticiones HTTP
     */
    private handleError(operation = 'operation') {
        return (error: HttpErrorResponse): Observable<never> => {
            console.error(`❌ Error en ${operation}:`, {
                mensaje: error.message,
                estado: error.status,
                error: error.error,
                url: error.url
            });

            // Si es un error del servidor y estamos en desarrollo, mostramos más detalles
            const errorMessage = environmentdb.production
                ? 'Error en el servidor'
                : `Error en ${operation}: ${error.message}`;

            return throwError(() => ({
                success: false,
                error: errorMessage,
                message: error.error?.message || 'Error en la operación'
            } as ApiErrorResponse));
        };
    }
}