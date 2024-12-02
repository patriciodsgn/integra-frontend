import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WsJarlisService {
  // URL del servicio a través del proxy configurado en Angular
  private api = '/api/jarlis';

  constructor(private http: HttpClient) {}

  getData(pcomuna: string, pdireem: string, pjardin: string, pmasreg: string): Observable<string> {
    // Cuerpo de la solicitud SOAP
    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws_jarlis.wsbeans.iseries/">
        <soapenv:Header/>
        <soapenv:Body>
          <ws:ws_jarlis>
            <arg0>
              <PCOMUNA>${pcomuna}</PCOMUNA>
              <PDIREEM>${pdireem}</PDIREEM>
              <PJARDIN>${pjardin}</PJARDIN>
              <PMASREG>${pmasreg}</PMASREG>
            </arg0>
          </ws:ws_jarlis>
        </soapenv:Body>
      </soapenv:Envelope>`;

    // Configuración de encabezados HTTP
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': ''
    });

    // Realizamos la solicitud POST con el cuerpo SOAP y los encabezados
    return this.http.post(this.api, soapEnvelope, {
      headers,
      responseType: 'text'  // Necesitamos la respuesta como texto plano para procesar el XML
    }).pipe(
      tap((response: string) => {
        // Lógica adicional en caso de necesitar procesar la respuesta
        //console.log('Respuesta recibida del servicio WS_JARLIS:', response);
      }),
      catchError((error) => {
        //console.error('Error al obtener datos del servicio WS_JARLIS:', error);
        return throwError(() => new Error('Error en la llamada SOAP: ' + error.message));
      })
    );
  }
}
