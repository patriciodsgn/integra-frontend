import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import { ConteoResponse, TotalNinosResponse } from '../models/dpgr-data.model';

@Injectable({
    providedIn: 'root'
})
export class DpgrService {
    private baseUrl = `${environmentdb.apidb}/educacion`;

    constructor(private http: HttpClient) {
        console.log('DpgrService inicializado con URL:', this.baseUrl);
    }

    // Métodos existentes
    getConteoJardines(codigoRegion: number = 0): Observable<ConteoResponse> {
        const url = `${this.baseUrl}/conteoJardines`;
        const params = {
            codigoRegion: codigoRegion.toString()
        };

        return this.http.get<ConteoResponse>(url, { params });
    }

    getTotalNinosOriginarios(ano: number, codigoRegion: number = 0): Observable<TotalNinosResponse> {
        const url = `${this.baseUrl}/totalNinosOriginarios`;
        const params = {
            ano: ano.toString(),
            codigoRegion: codigoRegion.toString()
        };

        return this.http.get<TotalNinosResponse>(url, { params });
    }

    getTotalNinosMigrantes(ano: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/totalNinosMigrantes`;
        const params = {
            ano: ano.toString(),
            codigoRegion: codigoRegion.toString()
        };

        return this.http.get<any>(url, { params });
    }

    // Nuevo método para obtener total de jardines con RO
    getTotalJardinesRO(anoRO: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/totalJardinesRO`;
        const params = {
            anoRO: anoRO.toString(),
            codigoRegion: codigoRegion.toString()
        };

        return this.http.get<any>(url, { params });
    }

    setRegionDpgr(regionId: number) {
        console.log('Región DPGR seleccionada:', regionId);
    }

    getEstadisticasDpgr(ano: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/estadisticasDpgr`;
        const params = {
            ano: ano.toString(),
            codigoRegion: codigoRegion.toString()
        };

        return this.http.get(url, { params });
    }

    getConteoJardinesIntegra(codigoRegion: number = 0): Observable<ConteoResponse> {
        const url = `${this.baseUrl}/conteoJardines`;
        const params = {
            codigoRegion: codigoRegion.toString()
        };

        return this.http.get<ConteoResponse>(url, { params });
    }

    getTotalNinosOriginariosIntegra(ano: number, codigoRegion: number = 0): Observable<TotalNinosResponse> {
        const url = `${this.baseUrl}/totalNinosOriginarios`;
        const params = {
            ano: ano.toString(),
            codigoRegion: codigoRegion.toString()
        };

        return this.http.get<TotalNinosResponse>(url, { params });
    }

    setRegionDpgrIntegra(regionId: number) {
        console.log('Región DPGR Integra seleccionada:', regionId);
    }
    
    getTotalJardinesSelloVerde(anoSV: number, codigoRegion: number = 0): Observable<any> {
        const url = `${this.baseUrl}/totalJardinesSelloVerde`;
        const params = {
            anoSV: anoSV.toString(),
            codigoRegion: codigoRegion.toString()
        };

        return this.http.get<any>(url, { params });
    }
}