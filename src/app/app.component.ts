import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) {
        
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                switchMap((route) => {
                    return route.data.pipe(
                        map((routeData: any) => {
                            const title = routeData['title'];
                            return { title };
                        }),
                    );
                }),
                tap((data: any) => {
                    let title = data.title;
                    title = (title ? title + ' | ' : '') + 'Integra - Fundacion';
                    this.titleService.setTitle(title);
                }),
            )
            .subscribe();

            this.setHighchartsToSpanish();
    }


    private setHighchartsToSpanish(): void {
        Highcharts.setOptions({
          lang: {
            // Configuración general
            decimalPoint: ',',
            thousandsSep: '.',
            loading: 'Cargando...',
            months: [
              'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
            ],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    
            // Botones de exportación
            printChart: 'Imprimir gráfico',
            downloadPNG: 'Descargar como PNG',
            downloadJPEG: 'Descargar como JPEG',
            downloadPDF: 'Descargar como PDF',
            downloadSVG: 'Descargar como SVG',
            
            // Mensajes de error
            contextButtonTitle: 'Opciones de exportación',
            noData: 'No hay datos disponibles',
    
            // Zoom
            resetZoom: 'Reiniciar zoom',
            resetZoomTitle: 'Reiniciar nivel de zoom',
    
            // Otros textos
            rangeSelectorFrom: 'Desde',
            rangeSelectorTo: 'Hasta',
            rangeSelectorZoom: 'Zoom',
          },
        });
      }
}
