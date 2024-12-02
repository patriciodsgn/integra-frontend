import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, catchError } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import {
    NecesidadesResponse,
    NecesidadesPorComunaResponse,
    PorcentajePermanenteResponse,
    ResumenNecesidades,
    CantidadTotalResponse

} from '../models/educacion-data.model';

@Injectable({
    providedIn: 'root'
})
export class EducacionService {
    private baseUrl = `${environmentdb.apidb}/educacion`;

    constructor(private http: HttpClient) {
        console.log('EducacionService inicializado con URL:', this.baseUrl);
    }

    getResumenNecesidades(ano: number, codigoRegion: number = 0): Observable<ResumenNecesidades> {
        const url = `${this.baseUrl}/necesidades`;

        return this.http.get<NecesidadesResponse>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => {
                console.log('Respuesta cruda del servidor:', response);
            }),
            map(response => {
                // Extraemos los valores directamente del objeto categorías
                const categorias = response.summary.necesidadesPorCategoria;
                const total = response.summary.cantidadTotal;

                // Accedemos directamente a los valores numéricos
                const permanente = Number(categorias['1. Permanente']) || 0;
                const transitoria = Number(categorias['2. Transitoria']) || 0;
                const rezago = Number(categorias['3. Rezago']) || 0;

                console.log('Valores extraídos:', {
                    permanente,
                    transitoria,
                    rezago,
                    total
                });

                // Calculamos los porcentajes
                const resumen = {
                    permanente: this.calcularPorcentaje(permanente, total),
                    transitoria: this.calcularPorcentaje(transitoria, total),
                    rezago: this.calcularPorcentaje(rezago, total)
                };

                console.log('Resumen calculado:', resumen);
                return resumen;
            }),
            catchError(error => {
                console.error('Error en getResumenNecesidades:', error);
                throw error;
            })
        );
    }

    getNecesidadesPorComuna(ano: number, codigoRegion: number = 0): Observable<NecesidadesPorComunaResponse> {
        const url = `${this.baseUrl}/necesidades/comuna`;

        return this.http.get<NecesidadesPorComunaResponse>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => console.log('Respuesta necesidades por comuna:', response))
        );
    }

    getPorcentajePermanente(ano: number, codigoRegion: number = 0): Observable<PorcentajePermanenteResponse> {
        const url = `${this.baseUrl}/porcentajePermanente`;

        return this.http.get<PorcentajePermanenteResponse>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => console.log('Respuesta porcentaje permanente:', response))
        );
    }

    private calcularPorcentaje(valor: number, total: number): number {
        if (!total) return 0;
        const porcentaje = (valor / total) * 100;
        console.log(`Calculando porcentaje: ${valor}/${total} = ${porcentaje.toFixed(1)}%`);
        return Number(porcentaje.toFixed(1));
    }

    getGraficoNEE(ano: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/graficoNEE`;

        return this.http.get<any>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => console.log('Respuesta gráfico NEE:', response)),
            catchError(error => {
                console.error('Error en getGraficoNEE:', error);
                throw error;
            })
        );
    }

    getPorcentajeRezago(ano: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/porcentajeRezago`;

        return this.http.get<any>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => console.log('Respuesta porcentaje rezago:', response)),
            catchError(error => {
                console.error('Error en getPorcentajeRezago:', error);
                throw error;
            })
        );
    }

    // Nuevo método para consumir el endpoint porcentajeATET
    getPorcentajeATET(ano: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/porcentajeATET`;

        return this.http.get<any>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => console.log('Respuesta porcentaje ATET:', response)),
            catchError(error => {
                console.error('Error en getPorcentajeATET:', error);
                throw error;
            })
        );
    }
    getPromedioSatisfaccionATET(ano: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/promedioSatisfaccion`;

        return this.http.get<any>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => console.log('Respuesta promedio satisfacción ATET:', response)),
            catchError(error => {
                console.error('Error en getPromedioSatisfaccionATET:', error);
                throw error;
            })
        );
    }

    getSatisfaccionGeografica(ano: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/satisfaccionGeografica`;

        return this.http.get<any>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => console.log('Respuesta satisfacción geográfica:', response)),
            catchError(error => {
                console.error('Error en getSatisfaccionGeografica:', error);
                throw error;
            })
        );
    }
    getCantidadTotal(ano: number, codigoRegion: number = 0): Observable<CantidadTotalResponse> {
        const url = `${this.baseUrl}/cantidadTotal`;

        return this.http.get<CantidadTotalResponse>(url, {
            params: {
                ano: ano.toString(),
                codigoRegion: codigoRegion.toString()
            }
        }).pipe(
            tap(response => console.log('Respuesta cantidad total:', response)),
            catchError(error => {
                console.error('Error en getCantidadTotal:', error);
                throw error;
            })
        );
    }
}