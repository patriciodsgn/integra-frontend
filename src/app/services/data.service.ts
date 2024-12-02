import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Definición de URLs para archivos JSON locales
  // para cuando esten las apis private readonly baseApiPath = 'https://api.miapp.com/';
  private readonly baseLocalPath = 'assets/'; // Ruta base para los archivos JSON
  private readonly jsonEndpoints = {
    ejecucionPresupuestaria: `${this.baseLocalPath}ejecucionPresupuestaria.json`,
    presupuestoResumen: `${this.baseLocalPath}ejecucionPresupuestaria.jso`,
    // Añade más rutas para otros archivos JSON si los necesitas
  };

  constructor(private http: HttpClient) {}

  // Método para obtener datos de ejecución presupuestaria
  getEjecucionPresupuestaria(): Observable<any> {
    return this.http.get<any>(this.jsonEndpoints.ejecucionPresupuestaria);
  }

  // Método para obtener datos del resumen de presupuesto
  getPresupuestoResumen(): Observable<any> {
    return this.http.get<any>(this.jsonEndpoints.ejecucionPresupuestaria);
  }

  // Puedes añadir más métodos similares para otras APIs/JSON
}
