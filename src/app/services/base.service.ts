import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = 'assets'; // Ruta base para datos simulados

  constructor(protected http: HttpClient) {}

  // Método genérico para obtener datos
  getDatos(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`);
  }
}
