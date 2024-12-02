
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api-service-final';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseApiService {
  // Método ejemplo para obtener datos
  getTestData(): Observable<any[]> {
    return this.get<any[]>('test-data');
  }

  // Método para insertar datos
  createTestData(data: any): Observable<any> {
    return this.post<any>('test-data', data);
  }
}