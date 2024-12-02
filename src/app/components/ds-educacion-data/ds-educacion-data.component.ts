import { Component } from '@angular/core';
import { ElemNote1Component } from '../elem-note1/elem-note1.component';
import { ElemBar1Component } from '../elem-bar1/elem-bar1.component';
import { ElemButtonGridComponent } from '../elem-button-grid/elem-button-grid.component';

interface ButtonData {
  icon: string;
  title: string;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-ds-educacion-data',
  standalone: true,
  imports: [
    ElemNote1Component,
    ElemBar1Component,
    ElemButtonGridComponent
  ],
  templateUrl: './ds-educacion-data.component.html',
  styleUrls: ['./ds-educacion-data.component.css'] // Correcto uso de 'styleUrls'
})
export class DsEducacionDataComponent {
  note: string = '';

  title: string = 'Dashboard de Datos';
  subtitle: string = 'Gestión de Datos Estratégicos / Casa Central';

  buttons: ButtonData[] = [
    { icon: 'favorite', title: 'Educación Primaria', description: 'Descripción detallada.', active: true },
    { icon: 'favorite', title: 'Educación Secundaria', description: 'Descripción detallada.', active: true },
    { icon: 'person', title: 'ATET', description: 'Ejemplo', active: false },
    { icon: 'person', title: 'ATET', description: "Ejemplo", active: false },
    { icon: 'person', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'business', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'school', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false },
    { icon: 'attach_money', title: 'Indicador 1', description: "Ejemplo", active: false }
  ];
}
