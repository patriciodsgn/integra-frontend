import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiUrlNEE = 'assets/tbNEE.json';
  private apiUrlJardin = 'assets/tbJardin.json';
  private apiUrlRegionIntegra = 'assets/tbRegionIntegra.json';

  constructor(private http: HttpClient) {}

  educacionGetNecesidades(codigoRegion: number, ano: number): Observable<any[]> {
    const query = `WITH Necesidades AS (
      SELECT
          n.DescripcionNEE,
          n.CategoriaNEE,
          r.NombreRegionIntegra AS DescripcionRegion,
          COUNT(*) AS Cantidad
      FROM
          tbNEE n
      INNER JOIN tbJardin j ON n.CodigoJardin = j.CodigoJardin
      INNER JOIN tbRegionIntegra r ON j.CodigoRegion = r.CodigoRegionIntegra
      WHERE
          (0 = :CodigoRegion OR j.CodigoRegion = :CodigoRegion)
          AND n.Ano = :ano
      GROUP BY
          n.DescripcionNEE,
          n.CategoriaNEE,
          r.NombreRegionIntegra
    )
    SELECT
        DescripcionNEE,
        CategoriaNEE,
        DescripcionRegion,
        Cantidad
    FROM
        Necesidades
    ORDER BY
        Cantidad DESC`;

    return this.executeQuery(query, { CodigoRegion: codigoRegion, Ano: ano });
  }

  educacionGetNecesidadesPorComuna(codigoRegion: number, ano: number): Observable<any[]> {
    const query = `WITH Necesidades AS (
      SELECT
          n.DescripcionNEE,
          n.CategoriaNEE,
          r.NombreRegionIntegra AS DescripcionRegion,
          j.Comuna,
          COUNT(*) AS Cantidad
      FROM
          tbNEE n
      INNER JOIN tbJardin j ON n.CodigoJardin = j.CodigoJardin
      INNER JOIN tbRegionIntegra r ON j.CodigoRegion = r.CodigoRegionIntegra
      WHERE
          (0 = :CodigoRegion OR j.CodigoRegion = :CodigoRegion)
          AND n.Ano = :Ano
      GROUP BY
          n.DescripcionNEE,
          n.CategoriaNEE,
          r.NombreRegionIntegra,
          j.Comuna
    )
    SELECT
        DescripcionNEE,
        CategoriaNEE,
        DescripcionRegion,
        Comuna,
        Cantidad
    FROM
        Necesidades
    ORDER BY
        Cantidad DESC`;

    return this.executeQuery(query, { CodigoRegion: codigoRegion, Ano: ano });
  }

  educacionGetTotalNecesidades(codigoRegion: number, ano: number): Observable<number> {
    const query = `SELECT
        COUNT(*) AS CantidadTotal
    FROM
        tbNEE n
    INNER JOIN tbJardin j ON n.CodigoJardin = j.CodigoJardin
    INNER JOIN tbRegionIntegra r ON j.CodigoRegion = r.CodigoRegionIntegra
    WHERE
        (0 = :CodigoRegion OR j.CodigoRegion = :CodigoRegion)
        AND (n.Ano = :Ano)`;

    return this.executeQuery(query, { CodigoRegion: codigoRegion, Ano: ano }).pipe(
      map(results => results.length ? results[0].CantidadTotal : 0)
    );
  }

  educacionGetPorcentajePermanente(codigoRegion: number, ano: number): Observable<any[]> {
    const query = `WITH NecesidadesPermanentes AS (
      SELECT
          j.CodigoRegion,
          r.NombreRegionIntegra AS DescripcionRegion,
          j.Comuna,
          COUNT(*) AS CantidadTotal,
          SUM(CASE WHEN n.CategoriaNEE LIKE '%Transitoria' THEN 1 ELSE 0 END) AS CantidadPermanente
      FROM
          tbNEE n
      INNER JOIN tbJardin j ON n.CodigoJardin = j.CodigoJardin
      INNER JOIN tbRegionIntegra r ON j.CodigoRegion = r.CodigoRegionIntegra
      WHERE
          (0 = :CodigoRegion OR j.CodigoRegion = :CodigoRegion)
          AND n.Ano = :Ano
      GROUP BY
          j.CodigoRegion,
          r.NombreRegionIntegra,
          j.Comuna
    )
    SELECT
        DescripcionRegion,
        Comuna,
        (CAST(CantidadPermanente AS FLOAT) / CantidadTotal) * 100 AS PorcentajePermanente
    FROM
        NecesidadesPermanentes
    ORDER BY
        DescripcionRegion, Comuna`;

    return this.executeQuery(query, { CodigoRegion: codigoRegion, Ano: ano });
  }

  private executeQuery(query: string, params: any = {}): Observable<any[]> {
    if (environment.useMockData) {
      return of(this.applySqlFilter([], params.CodigoRegion, params.Ano));
    }
    
    try {
      let httpParams = new HttpParams().set('sql', query);
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });

      return this.http.get<any[]>(`${environment.api}/query`, { params: httpParams })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error en executeQuery:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error en executeQuery:', error);
      return of([]);
    }
  }

  applySqlFilter(data: any[], codigoRegion: number, ano: number): any[] {
    return data.filter(item =>
      (codigoRegion === 0 || item.CodigoRegion === codigoRegion) &&
      (ano === 0 || item.Ano === ano)
    );
  }
}

// Uso en el componente
// this.educacionService.educacionGetNecesidades(codigoRegion, ano).subscribe(data => {
//   console.log(data);
// });
