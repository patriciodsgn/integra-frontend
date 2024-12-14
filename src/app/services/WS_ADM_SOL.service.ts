import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, timeout, retry, map } from 'rxjs/operators';

// Interfaz para la respuesta de establecimientos
export interface EstablecimientosResponse {
  totalEstablecimientos: number;
  totalAdmDirecta: number;
  totalAdmDelegada: number;
  totalJardinSobreRuedas: number;
  totalSalaCunaJardin: number;
  totalSalaCuna: number;
  totalParvulos: number;
  totalSinFuncionamiento: number; // Nuevo campo agregado
}

@Injectable({
  providedIn: 'root'
})
export class WS_ADM_SOLService {
  private api = '/api/adm-sol';
  private timeoutDuration = 30000;
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
            <SOLACC>{{solacc}}</SOLACC>
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
      this.globalStartTime = performance.now();
      //console.log(`[${new Date().toISOString()}] Global process started.`);
    }

    const cacheKey = `${region}-${offset}`;
    if (this.cache.has(cacheKey)) {
      //console.log(`[${new Date().toISOString()}] Cache hit for key: ${cacheKey}`);
      const cachedValue = this.cache.get(cacheKey);
      return of(cachedValue ? cachedValue : '');
    }

    //console.log(`[${new Date().toISOString()}] Sending SOAP request for key: ${cacheKey}`);
    const startTime = performance.now();
    const soapEnvelope = this.createSoapEnvelope('W_JAR_TOD4', region, offset);

    return this.http.post(this.api, soapEnvelope, {
      headers: this.defaultHeaders,
      responseType: 'text'
    }).pipe(
      timeout(this.timeoutDuration),
      retry(2),
      tap(response => {
        const endTime = performance.now();
        //console.log(`[${new Date().toISOString()}] SOAP request completed for key: ${cacheKey}. Time taken: ${(endTime - startTime).toFixed(2)} ms`);
        this.cache.set(cacheKey, response);
      }),
      catchError(this.handleError)
    );
  }

  // Nuevo método para obtener información de establecimientos
  getEstablecimientos(region: String ): Observable<EstablecimientosResponse> {
    //console.log(`[${new Date().toISOString()}] Requesting establecimientos information`);
    const startTime = performance.now();
    //console.log("Region seleccionada : " , region)
    const soapEnvelope = this.createSoapEnvelope('W_INF_JI', region.toString(), '');
    //console.log("Establecimientos " , soapEnvelope);
    return this.http.post(this.api, soapEnvelope, {
      headers: this.defaultHeaders,
      responseType: 'text'
    }).pipe(
      timeout(this.timeoutDuration),
      retry(2),
      map(response => this.parseEstablecimientosResponse(response)),
      tap(response => {
        const endTime = performance.now();
        //console.log(`[${new Date().toISOString()}] Establecimientos request completed. Time taken: ${(endTime - startTime).toFixed(2)} ms`, response);
        //console.log(`[${new Date().toISOString()}] Respuesta de establecimientos:`, response);
      }),
      catchError(this.handleError)
    );
  }

  private parseEstablecimientosResponse(xmlResponse: string): EstablecimientosResponse {
    try {
      console.log("xml establecimiento", xmlResponse);
      const match = xmlResponse.match(/<SOLOUT>(.*?)<\/SOLOUT>/);
      if (!match || !match[1]) {
        throw new Error('No se encontró el contenido SOLOUT en la respuesta');
      }
  
      const parsedData = JSON.parse(match[1]);
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error('El contenido de SOLOUT no tiene el formato esperado');
      }
  
      const data = parsedData[0];
  
      const normalizedData = Object.keys(data).reduce((acc, key) => {
        const normalizedKey = key.trim().replace(/\s+/g, ' ');
        acc[normalizedKey] = parseInt(data[key].trim(), 10) || 0;
        return acc;
      }, {} as Record<string, number>);
  
      return {
        totalEstablecimientos: normalizedData['Total Establecimientos'] || 0,
        totalAdmDirecta: normalizedData['Total Adm. Directa'] || 0,
        totalAdmDelegada: normalizedData['Total Adm. Delegada'] || 0,
        totalJardinSobreRuedas: normalizedData['Total Jardín Sobre Ruedas'] || 0,
        totalSalaCunaJardin: normalizedData['Total Sala Cuna y Jardín'] || 0,
        totalSalaCuna: normalizedData['Total Sala Cuna'] || 0,
        totalParvulos: normalizedData['Total Párvulos'] || 0,
        totalSinFuncionamiento: normalizedData['Total Sin Funcionamiento'] || 0 // Nuevo campo agregado
      };
    } catch (error) {
      console.error('Error parsing establecimientos response:', error);
      throw new Error('Error al procesar la respuesta del servicio');
    }
  }

  private createSoapEnvelope(solacc: string, region: string, offset: string): string {
    return this.soapTemplate
      .replace('{{solacc}}', solacc)
      .replace('{{region}}', this.sanitizeInput(region))
      .replace('{{offset}}', this.sanitizeInput(offset));
  }

  private sanitizeInput(input: string): string {
    if (!input) return '';
    return input
      .replace(/[<>]/g, '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    const timestamp = new Date().toISOString();
    let errorMessage = 'Error en el servicio SOAP';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error de cliente: ${error.error.message}`;
    } else {
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