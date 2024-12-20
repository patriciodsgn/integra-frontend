import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import {
    AccidentesResponse,
    DiagnosticoNutricionalResponse,
    InformacionClaraResponse,
    InformacionGeograficaResponse,
    InformacionGeograficaData
} from '../models/dppi-data.models';

@Injectable({
    providedIn: 'root'
})
export class DppiService {
    private baseUrl = `${environmentdb.apidb}/dppi`;

    constructor(private http: HttpClient) {
        console.log('DppiService inicializado con URL:', this.baseUrl);
    }

    // Service
getTotalAccidentes(
    ano?: number,
    codigoRegion: number = 0,
    codigoJardin: number = 0
): Observable<AccidentesResponse> {
    const url = `${this.baseUrl}/totalAccidentes`;
    const params: any = {};
    
    if (ano) params.ano = ano.toString();
    if (codigoRegion) params.codigoRegion = codigoRegion.toString();
    if (codigoJardin) params.codigoJardin = codigoJardin.toString();

    return this.http.get<AccidentesResponse>(url, { params });
}

getTotalesDiagnosticoNutricional(
    ano?: number,
    codigoRegion: number = 0,
    codigoJardin: number = 0
): Observable<DiagnosticoNutricionalResponse> {
    const url = `${this.baseUrl}/totalesDiagnosticoNutricional`;
    const params: any = {};
    
    if (ano) params.ano = ano.toString();
    if (codigoRegion) params.codigoRegion = codigoRegion.toString();
    if (codigoJardin) params.codigoJardin = codigoJardin.toString();

    return this.http.get<DiagnosticoNutricionalResponse>(url, { params });
}

getInformacionClaraOportuna(
    ano?: number,
    codigoRegion: number = 0
): Observable<InformacionClaraResponse> {
    const url = `${this.baseUrl}/informacionClaraOportuna`;
    const params: any = {};
    
    if (ano) params.ano = ano.toString();
    if (codigoRegion) params.codigoRegion = codigoRegion.toString();

    return this.http.get<InformacionClaraResponse>(url, { params });
}

getInformacionGeografica(
    ano?: number,
    codigoRegion: number = 0
): Observable<InformacionGeograficaResponse> {
    const url = `${this.baseUrl}/informacionGeografica`;
    const params: any = {};
    
    if (ano) params.ano = ano.toString();
    if (codigoRegion) params.codigoRegion = codigoRegion.toString();

    return this.http.get<InformacionGeograficaResponse>(url, { params });
}

getParticipacionEncuestados(
    anio?: number,
    codigoRegion: number = 0
): Observable<InformacionGeograficaData> {
    const url = `${this.baseUrl}/participacionEncuestados`;
    const params: any = {};
    
    if (anio) params.anio = anio.toString();
    if (codigoRegion) params.codigoRegion = codigoRegion.toString();

    return this.http.get<InformacionGeograficaData>(url, { params });
}
}