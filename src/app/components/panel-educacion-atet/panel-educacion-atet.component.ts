import { Component } from '@angular/core';

// Importa los componentes necesarios
import { ElemDraw01Component } from '../elem-draw-01/elem-draw-01.component';
import { ElemDraw02Component } from '../elem-draw-02/elem-draw-02.component';
import { ElemDraw03Component } from '../elem-draw-03/elem-draw-03.component';
import { ElemDraw04Component } from '../elem-draw-04/elem-draw-04.component';
import { ElemDraw05Component } from '../elem-draw-05/elem-draw-05.component';

@Component({
  selector: 'app-panel-educacion-atet',
  standalone: true,
  imports: [
    ElemDraw01Component,
    ElemDraw02Component,
    ElemDraw03Component,
    ElemDraw04Component,
    ElemDraw05Component,
  ],
  templateUrl: './panel-educacion-atet.component.html',
  styleUrls: ['./panel-educacion-atet.component.css']
})
export class PanelEducacionAtetComponent {}
