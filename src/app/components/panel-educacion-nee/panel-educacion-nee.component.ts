import { Component, OnInit } from '@angular/core';
import { EducacionService } from '../../services/educacion.services';

import { ElemDraw01Component } from '../elem-draw-01/elem-draw-01.component';
import { ElemDraw02Component } from '../elem-draw-02/elem-draw-02.component';
import { ElemDraw03Component } from '../elem-draw-03/elem-draw-03.component';
import { ElemDraw04Component } from '../elem-draw-04/elem-draw-04.component';
import { ElemDraw05Component } from '../elem-draw-05/elem-draw-05.component';
import { ElemCardGrid1Component } from '../elem-card-grid1/elem-card-grid1.component';

@Component({
  selector: 'app-panel-educacion-nee',
  standalone: true,
  imports: [
    ElemDraw01Component,
    ElemDraw02Component,
    ElemDraw03Component,
    ElemDraw04Component,
    ElemDraw05Component,
    ElemCardGrid1Component,
  ],
  templateUrl: './panel-educacion-nee.component.html',
  styleUrls: ['./panel-educacion-nee.component.css'],
})
export class PanelEducacionNeeComponent implements OnInit {
  cardGridBgColor: string = '#fdba74';
  cardBgColor: string = '#ffffff';
  cardTextColor1: string = '#431407';
  cardTextColor2: string = '#431407';

  // Propiedades para las tarjetas
  cardValue1: string = '-';
  cardLabel1: string = 'NEE';
  cardValue2: string = '-';
  cardLabel2: string = 'PLAEP Reporte de aprendizajes esperados para la edad';
  cardValue3: string = '-';
  cardLabel3: string = 'Análisis de Prácticas pedagógicas de calidad';
  cardValue4: string = '-';
  cardLabel4: string = 'Personas Matriculadas en cursos de formación';
  cardValue5: string = '-';
  cardLabel5: string = 'ATET número de visitas';
  cardValue6: string = '-';
  cardLabel6: string = 'Establecimientos con Sellos Verdes';

  // Valores para el gráfico circular
  chart5Value1: number = 0;
  chart5Value2: number = 0;
  chart5Value3: number = 0;

  constructor(private educacionService: EducacionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;


    // cards
    this.educacionService.getCantidadTotal(ano, codigoRegion).subscribe({
      next: (res) => {
        this.cardValue1 = `${res.data.cantidadTotal}`;
      },
      error: (err) => {
        console.error('Error al cargar el resumen de necesidades:', err);
      },
    });

    // map
    
    // triangle

    // bar h


    // bar v

    
    
    
    // getSatisfaccionGeografica      
    // getNecesidadesPorComuna
    // getGraficoNEE

      // getPorcentajeATET
      // getPromedioSatisfaccionATET
    




    
   
    // pie
    this.educacionService.getPorcentajeRezago(ano, codigoRegion).subscribe({
      next: (res) => {
        console.log('\x1b[34m%s\x1b[0m', '-------getPorcentajeRezago-----------');
        console.log(res);
        console.log('\x1b[34m%s\x1b[0m', '-----------');

      },
      error: (err) => {
        console.error('Error al cargar el resumen de necesidades:', err);
      },
    });



    
    // pie
    this.educacionService.getPorcentajePermanente(ano, codigoRegion).subscribe({
      next: (res) => {
        console.log('VALOR:', res);
      },
      error: (err) => {
        console.error('Error al cargar el resumen de necesidades:', err);
      },
    });



    this.educacionService.getResumenNecesidades(ano, codigoRegion).subscribe({
      next: (res) => {
        // console.log('\x1b[34m%s\x1b[0m', 'Texto en azul:', res);

        this.chart5Value1 = res.permanente;
        this.chart5Value2 = res.transitoria;
        this.chart5Value3 = res.rezago;
        
      },
      error: (err) => {
        console.error('Error al cargar el resumen de necesidades:', err);
      },
    });


  }
}
