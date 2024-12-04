import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';
import { ConteoResponse, EstadisticasROResponse, FrecuenciaPueblosOriginariosResponse, NacionalidadExranjeraResponse, NacionalidadGeograficaResponse, PueblosOriginariosResponse, SelloVerdeGraficoResponse, TotalNinosResponse } from '../models/dpgr-data.model';

@Injectable({
    providedIn: 'root'
})
export class DpgrService {
    private baseUrl = `${environmentdb.apidb}/dpgr`;

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

    getFrecuenciaPueblosOriginarios(
        ano?: number,
        codigoRegion: number = 0,
        codigoJardin: number = 0
    ): Observable<FrecuenciaPueblosOriginariosResponse> {
        const url = `${this.baseUrl}/frecuenciaPueblosOriginarios`;
        const params: any = {
            codigoRegion: codigoRegion.toString()
        };

        if (ano) {
            params.ano = ano.toString();
        }

        if (codigoJardin) {
            params.codigoJardin = codigoJardin.toString();
        }

        return this.http.get<FrecuenciaPueblosOriginariosResponse>(url, { params });
    }
    getEstadisticasRO(
        anoRO: number, 
        codigoRegion: number = 0, 
        codigoJardin: number = 0
    ): Observable<EstadisticasROResponse> {
        const url = `${this.baseUrl}/estadisticasRO`;
        const params = {
            anoRO: anoRO.toString(),
            codigoRegion: codigoRegion.toString(),
            codigoJardin: codigoJardin.toString()
        };
    
        return this.http.get<EstadisticasROResponse>(url, { params });
    }
    getGraficoSelloVerde(
        anoSV?: number,
        codigoRegion: number = 0,
        codigoJardin: number = 0
    ): Observable<SelloVerdeGraficoResponse> {
        const url = `${this.baseUrl}/graficoSelloVerde`;
        const params: any = {};
        
        if (anoSV) params.anoSV = anoSV.toString();
        if (codigoRegion) params.codigoRegion = codigoRegion.toString();
        if (codigoJardin) params.codigoJardin = codigoJardin.toString();
    
        return this.http.get<SelloVerdeGraficoResponse>(url, { params });
    }

    getPorcentajeNacionalidadExtranjera(
    ano?: number,
    codigoRegion: number = 0,
    codigoJardin: number = 0
): Observable<NacionalidadExranjeraResponse> {
    const url = `${this.baseUrl}/porcentajeNacionalidadExtranjera`;
    const params: any = {};
    
    if (ano) params.ano = ano.toString();
    if (codigoRegion) params.codigoRegion = codigoRegion.toString();
    if (codigoJardin) params.codigoJardin = codigoJardin.toString();

    return this.http.get<NacionalidadExranjeraResponse>(url, { params });
}


getPorcentajePueblosOriginarios(
    ano?: number,
    codigoRegion: number = 0
): Observable<PueblosOriginariosResponse> {
    const url = `${this.baseUrl}/porcentajePueblosOriginarios`;
    const params: any = {};
    
    if (ano) params.ano = ano.toString();
    if (codigoRegion) params.codigoRegion = codigoRegion.toString();

    return this.http.get<PueblosOriginariosResponse>(url, { params });
}
getNacionalidadPorGeografia(
    ano?: number,
    codigoRegion: number = 0
): Observable<NacionalidadGeograficaResponse> {
    const url = `${this.baseUrl}/nacionalidadPorGeografia`;
    const params: any = {};
    
    if (ano) params.ano = ano.toString();
    if (codigoRegion) params.codigoRegion = codigoRegion.toString();

    return this.http.get<NacionalidadGeograficaResponse>(url, { params });
}

}
