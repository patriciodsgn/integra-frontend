import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService extends BaseService {
  getTarjetasSuperiores(): Observable<any[]> {
    return this.getDatos('tarjetas-superiores.json'); // Archivo JSON con los datos simulados
  }

  // Método para obtener datos por región o comuna si es necesario (podemos usarlo más tarde)
  getTarjetasPorNivel(nivel: string, id?: string): Observable<any[]> {
    if (id) {
      return this.getDatos(`${nivel}/${id}/tarjetas-superiores.json`);
    } else {
      return this.getTarjetasSuperiores(); // Por defecto devuelve los datos nacionales
    }
  }
}
