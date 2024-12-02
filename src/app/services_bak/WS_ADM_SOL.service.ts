import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WS_ADM_SOLService {
  private api = '/api/adm-sol';

  constructor(private http: HttpClient) {}

  getData(region: string, offset: string = ''): Observable<string> {
    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws_adm_sol.wsbeans.iseries/">
        <soapenv:Header/>
        <soapenv:Body>
          <ws:ws_adm_sol>
            <arg0>
              <SOLACC>W_JAR_TOD2</SOLACC>
              <SOLINP>${region}||\\</SOLINP>
              <SOLMAS>${offset}</SOLMAS>
            </arg0>
          </ws:ws_adm_sol>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': ''
    });

console.log('SOAP Envelope:', soapEnvelope);
console.log('Headers:', headers);
    return this.http.post(this.api, soapEnvelope, {
      headers,
      responseType: 'text'
    }).pipe(
      tap((response: string) => {
        console.log('SOAP Response:', response);
        // Add additional logging to track SOLMAS values
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, 'text/xml');
        const solmasElement = xmlDoc.getElementsByTagName('SOLMAS')[0];
        if(solmasElement) {
          console.log('SOLMAS value:', solmasElement.textContent);
        }
      }),
      catchError((error) => {
        console.error('SOAP Error:', error);
        return throwError(() => error);
      })
    );
  }
}
