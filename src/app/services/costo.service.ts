
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import { ConteoResponse, EstadisticasROResponse, FrecuenciaPueblosOriginariosResponse, NacionalidadExranjeraResponse, NacionalidadGeograficaResponse, PueblosOriginariosResponse, SelloVerdeGraficoResponse, TotalNinosResponse } from '../models/dpgr-data.model';

@Injectable({
    providedIn: 'root'
})
export class DpgrService {
    private baseUrl = `${environmentdb.apidb}/costos`;
    

    constructor(private http: HttpClient) {
        console.log('DpgrService inicializado con URL:', this.baseUrl);
    }

    getCostEvolution(year?: number) {
        const params = new HttpParams()
            .set('ano', year?.toString() || '');

        return this.http.get<any>('/api/evolucionCostos', { params });
    }
}