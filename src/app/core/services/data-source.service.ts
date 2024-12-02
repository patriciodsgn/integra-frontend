import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment, environmentp } from '../../../environments/environment';
import { Jardin, Nino } from '../models/models';
import * as jardinesData from '../../../assets/tbJardin.json';
import * as ninosData from '../../../assets/tbPONino.json';

@Injectable({
    providedIn: 'root'
})
export class DataSourceService {
    private mockData = {
        jardines: (jardinesData as any).tbJardin as Jardin[],  // Cambio de .default a .tbJardin
        ninos: (ninosData as any).tbPONino as Nino[]          // Cambio de .default a .tbPONino

    };

    constructor(private http: HttpClient) {
        console.log('Mock data inicial:', {
            jardines: this.mockData.jardines?.length || 0,
            ninos: this.mockData.ninos?.length || 0
        });
    }

    executeQuery(query: string, params: any = {}): Observable<any[]> {
        if (environment.useMockData) {
            console.log('Executing mock query with params:', query, params);
            return of(this.executeMockQuery(query, params));
        }
        
        try {
            // Construir los parámetros HTTP de forma segura
            let httpParams = new HttpParams()
                .set('sql', query);
            
            // Agregar parámetros adicionales
            Object.keys(params).forEach(key => {
                httpParams = httpParams.set(key, params[key]);
            });

            // Hacer la llamada HTTP con manejo de errores
            console.log('Executing HTTP query:', query, 'with params:', httpParams);
            return this.http.get<any[]>(`${environmentp.apiurl}/query`, { params: httpParams });
        } catch (error) {
            console.error('Error en executeQuery:', error);
            return of([]);
        }
    }

    private executeMockQuery(query: string, params: any): any[] {
        const normalizedQuery = query.toLowerCase();
        console.log('Normalized query:', normalizedQuery);
        
        if (normalizedQuery.includes('group by grupooriginariooindigena')) {
            console.log('Getting pueblos originarios summary');
            return this.getPueblosOriginariosSummary();
        }
        
        if (normalizedQuery.includes('where codigoregion =')) {
            console.log('Getting region data for region:', params.region);
            return this.getRegionData(params.region);
        }

        console.log('No matching mock query found');
        return [];
    }

    private getPueblosOriginariosSummary(): any[] {
        const pueblos = new Map<string, number>();
        const total = this.mockData.ninos.length;
        console.log('Total ninos:', total);

        this.mockData.ninos.forEach(nino => {
            const pueblo = nino.GrupoOriginariooIndigena.trim();
            if (pueblo !== 'No Pertenece') {
                pueblos.set(pueblo, (pueblos.get(pueblo) || 0) + 1);
            }
        });

        const summary = Array.from(pueblos.entries()).map(([nombre, cantidad]) => ({
            nombre,
            cantidad,
            porcentaje: (cantidad / total) * 100
        }));
        console.log('Pueblos originarios summary:', summary);
        return summary;
    }

    private getRegionData(region: number): any[] {
        console.log('Filtering jardines for region:', region);
        const jardinesRegion = this.mockData.jardines.filter(j => j.CodigoRegion === region);
        console.log('Jardines in region:', jardinesRegion);
        
        if (jardinesRegion.length === 0) {
            console.warn('No jardines found for region:', region, '- Verifica si existen datos en tbJardin.json con CodigoRegion igual a', region);
            return [];
        }

        const codigosJardin = jardinesRegion.map(j => j.CodigoJardin);
        console.log('Codigos Jardin in region:', codigosJardin);
        
        const ninosInRegion = this.mockData.ninos.filter(n => codigosJardin.includes(n.CodigoJardin));
        console.log('Ninos in region:', ninosInRegion);
        return ninosInRegion;
    }
}
