import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environmentdb } from 'src/environments/environment';

interface LoginResponse {
  success: boolean;
  data?: any[];
  message?: string;
}

interface UsuarioResponse {
  success: boolean;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environmentdb.apidb}/login`;
  private isAuthenticated = false; // Estado local de autenticación

  // BehaviorSubject para manejar los datos del usuario
  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable(); // Observable para los componentes

  constructor(private http: HttpClient) {}

  /**
   * Método para autenticar al usuario con la API.
   * @param credentials Credenciales del usuario (CorreoElectronico y RUT)
   * @returns Observable con la respuesta de la API
   */
  login(credentials: { CorreoElectronico: string; RUT: number }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}`, credentials);
  }

  /**
   * Método para obtener información del usuario autenticado desde la API.
   * @param correo Correo del usuario
   * @returns Observable con la información del usuario
   */
  getUsuario(correo: string): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/usuario`, { correo }).pipe(
      map((response: any) => {
        if (response.success) {
          const userData = {
            datosUsuario: response.data.datosUsuario,
            permisos: response.data.permisos,
            region: response.data.region,
          };
          this.setUsuario(userData); // Almacenar el usuario
          return {
            success: response.success,
            data: userData,
          } as UsuarioResponse;
        } else {
          throw new Error(response.message || 'Error al obtener el usuario');
        }
      }),
      catchError((error) => {
        console.error('Error en getUsuario:', error);
        return throwError(() => new Error('Error al obtener los datos del usuario'));
      })
    );
  }

  /**
   * Almacena los datos del usuario en memoria y localStorage.
   * @param data Los datos del usuario.
   */
  setUsuario(data: any): void {
    this.usuarioSubject.next(data); // Notificar a los suscriptores
    localStorage.setItem('usuario', JSON.stringify(data)); // Guardar en localStorage
  }

  /**
   * Obtiene los datos del usuario desde memoria o localStorage si no están cargados.
   * @returns Los datos del usuario.
   */
  getUsuarioData(): any {
    const usuario = this.usuarioSubject.getValue();
    if (!usuario) {
      const storedUser = localStorage.getItem('usuario');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return usuario;
  }

  /**
   * Limpia los datos del usuario de memoria y localStorage.
   */
  clearUsuario(): void {
    this.usuarioSubject.next(null); // Limpiar memoria
    localStorage.removeItem('usuario'); // Limpiar localStorage
  }

  /**
   * Método para establecer el estado de autenticación local.
   * @param authenticated Estado de autenticación (true o false)
   */
  setAuthenticated(authenticated: boolean): void {
    this.isAuthenticated = authenticated;
  }

  /**
   * Método para verificar si el usuario está autenticado localmente.
   * @returns Estado de autenticación (true o false)
   */
  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Método para cerrar sesión.
   * Limpia el estado local y el localStorage.
   */
  logout(): void {
    this.isAuthenticated = false;
    this.clearUsuario(); // Limpia el usuario almacenado
    console.log('Usuario ha cerrado sesión');
  }
}
