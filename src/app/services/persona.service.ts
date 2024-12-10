import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';

export interface IndicadorRegion {
  Region: string;
  Indicador: string;
  ValorActual: number;
  ValorObjetivo: number;
  Semaforo: string;
}

export interface CompararIndicadores {
  Indicador: string;
  ValorActual: number;
  ValorAnterior: number;
  Variacion: string;
  PeriodoActual: string;
  PeriodoAnterior: string;
}

export interface TendenciaIndicadores {
  Indicador: string;
  Mes: number;
  Ano: number;
  Valor: number;
}

export interface ObjetivoVsActual {
  Indicador: string;
  Region: string;
  ValorActual: number;
  ValorObjetivo: number;
  Semaforo: string;
}

@Injectable({
  providedIn: 'root',
})
export class IndicadoresService {
  private baseUrl = `${environmentdb.apidb}`; // URL configurada en environment

  constructor(private http: HttpClient) {
    console.log('IndicadoresService inicializado con URL:', this.baseUrl);
  }

  getSemaforoIndicadores(ano: number, codigoRegionPersona?: number): Observable<IndicadorRegion[]> {
    const params = new HttpParams()
      .set('Ano', ano.toString())
      .set('CodigoRegionPersona', codigoRegionPersona ? codigoRegionPersona.toString() : '');

    return this.http.get<IndicadorRegion[]>(`${this.baseUrl}/semaforoIndicadores`, { params });
  }

  getCompararIndicadores(mesActual: number, anoActual: number): Observable<CompararIndicadores[]> {
    const params = new HttpParams()
      .set('MesActual', mesActual.toString())
      .set('AnoActual', anoActual.toString());

    return this.http.get<CompararIndicadores[]>(`${this.baseUrl}/compararIndicadores`, { params });
  }

  getTendenciaIndicadores(ano: number, codigoRegionPersona: number): Observable<TendenciaIndicadores[]> {
    const params = new HttpParams()
      .set('Ano', ano.toString())
      .set('CodigoRegionPersona', codigoRegionPersona.toString());

    return this.http.get<TendenciaIndicadores[]>(`${this.baseUrl}/tendenciaIndicadores`, { params });
  }

  getObjetivoVsActual(ano: number, codigoRegionPersona?: number): Observable<ObjetivoVsActual[]> {
    const params = new HttpParams()
      .set('Ano', ano.toString())
      .set('CodigoRegionPersona', codigoRegionPersona ? codigoRegionPersona.toString() : '');

    return this.http.get<ObjetivoVsActual[]>(`${this.baseUrl}/objetivoVsActual`, { params });
  }
}
