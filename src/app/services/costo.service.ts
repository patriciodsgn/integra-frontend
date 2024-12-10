
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import {
    ConteoResponse, 
    EstadisticasROResponse, 
    FrecuenciaPueblosOriginariosResponse, 
    NacionalidadExranjeraResponse, 
    NacionalidadGeograficaResponse, 
    PueblosOriginariosResponse, 
    SelloVerdeGraficoResponse, 
    TotalNinosResponse
} from '../models/dpgr-data.model';
import {
    CostEvolutionData,
    CostEvolutionResponse,
    ErrorResponse,
    CostRecord,
    CostEvolutionParams,
    ApiResponse,
    ComparativoCMM,
} from '../models/costo.data.models';

@Injectable({
    providedIn: 'root'
})
export class CostoService {
    private baseUrl = `${environmentdb.apidb}/costos`;

    constructor(private http: HttpClient) {
        console.log('CostoService inicializado con URL:', this.baseUrl);
    }

    getCostEvolution(year?: number) {
        const params = new HttpParams().set('ano', year?.toString() || '');
        const url = `${this.baseUrl}/evolucionCostos`;

        return this.http.get<CostEvolutionData>(url, { params });
        // return this.http.get<any>('/api/costos/evolucionCostos', { params });
        // return this.http.get('http://localhost:3000/api/costos/evolucionCostos', { params });

    }
}