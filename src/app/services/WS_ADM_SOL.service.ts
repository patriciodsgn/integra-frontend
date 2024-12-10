
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, timeout, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WS_ADM_SOLService {
  private api = '/api/adm-sol';
  private timeoutDuration = 30000; // 30 segundos de timeout
  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'text/xml',
    'SOAPAction': '',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });
  private readonly soapTemplate = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws_adm_sol.wsbeans.iseries/">
      <soapenv:Header/>
      <soapenv:Body>
        <ws:ws_adm_sol>
          <arg0>
            <SOLACC>W_JAR_TOD4</SOLACC>
            <SOLINP>{{region}}||\\</SOLINP>
            <SOLMAS>{{offset}}</SOLMAS>
          </arg0>
        </ws:ws_adm_sol>
      </soapenv:Body>
    </soapenv:Envelope>`;

  private cache = new Map<string, string>();
  private globalStartTime: number | null = null;

  constructor(private http: HttpClient) {}

  getData(region: string, offset: string = ''): Observable<string> {
    if (!this.globalStartTime) {
      this.globalStartTime = performance.now(); // Registrar el inicio del proceso global
      console.log(`[${new Date().toISOString()}] Global process started.`);
    }

    const cacheKey = `${region}-${offset}`;
    if (this.cache.has(cacheKey)) {
      console.log(`[${new Date().toISOString()}] Cache hit for key: ${cacheKey}`);
      const cachedValue = this.cache.get(cacheKey);
      return of(cachedValue ? cachedValue : '');
    }

    console.log(`[${new Date().toISOString()}] Sending SOAP request for key: ${cacheKey}`);
    const startTime = performance.now();
    const soapEnvelope = this.createSoapEnvelope(region, offset);

    return this.http.post(this.api, soapEnvelope, {
      headers: this.defaultHeaders,
      responseType: 'text'
    }).pipe(
      timeout(this.timeoutDuration),
      retry(2),
      tap(response => {
        const endTime = performance.now();
        console.log(`[${new Date().toISOString()}] SOAP request completed for key: ${cacheKey}. Time taken: ${(endTime - startTime).toFixed(2)} ms`);
        this.cache.set(cacheKey, response);
      }),
      tap(() => {
        // Si es la última región procesada, calcular el tiempo total
        if (region === '17' && offset === 'last_offset') {
          const globalEndTime = performance.now();
          console.log(`[${new Date().toISOString()}] Global process completed. Total time taken: ${(globalEndTime - this.globalStartTime!).toFixed(2)} ms`);
          this.globalStartTime = null; // Reiniciar tiempo global
        }
      }),
      catchError(error => {
        const globalEndTime = performance.now();
        console.log(`[${new Date().toISOString()}] Global process failed. Total time taken: ${(globalEndTime - this.globalStartTime!).toFixed(2)} ms`);
        this.globalStartTime = null; // Reiniciar tiempo global en caso de error
        return this.handleError(error);
      })
    );
  }

  private createSoapEnvelope(region: string, offset: string): string {
    return this.soapTemplate
      .replace('{{region}}', this.sanitizeInput(region))
      .replace('{{offset}}', this.sanitizeInput(offset));
  }

  private sanitizeInput(input: string): string {
    if (!input) return '';
    // Sanitización básica para prevenir inyección XML
    return input
      .replace(/[<>]/g, '') // Elimina < y >
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    const timestamp = new Date().toISOString();
    let errorMessage = 'Error en el servicio SOAP';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error de cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      switch (error.status) {
        case 500:
          errorMessage = 'Error interno del servidor SOAP (500)';
          break;
        case 404:
          errorMessage = 'Servicio SOAP no encontrado (404)';
          break;
        case 408:
          errorMessage = 'Tiempo de espera agotado en la petición SOAP';
          break;
        case 0:
          errorMessage = 'No se pudo conectar con el servidor SOAP';
          break;
        default:
          errorMessage = `Error del servidor SOAP: ${error.status} - ${error.message}`;
      }
    }

    // Log detallado del error
    console.error(`[${timestamp}] SOAP Error:`, {
      message: errorMessage,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      error: error.error
    });

    return throwError(() => new Error(errorMessage));
  };
}
