import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonStateService } from '../../button-state.service';

import { ElemHeaderComponent } from '../elem-header/elem-header.component';
import { ElemButtonGridComponent } from '../elem-button-grid/elem-button-grid.component';


interface ButtonData {
  eb_icon: string;
  eb_title: string;
  eb_subtitle: string;
  eb_disable: boolean;
  eb_bg_color: string;
  eb_text_color: string;
  eb_link: string;
}


@Component({
  selector: 'app-view-personas',
  standalone: true,
  imports: [
    RouterModule,
    ElemHeaderComponent,
    ElemButtonGridComponent,
  ],
  templateUrl: './view-personas.component.html',
  styleUrls: ['./view-personas.component.css'],
})
export class ViewPersonasComponent {
  public buttonStateService = inject(ButtonStateService);

  title: string = 'Dashboard de Personas';
  subtitle: string = 'Datos Estratégicos / Dirección Central';
  headerBgColor: string = '#a5b4fc';
  headerTextColor: string = '#27272a';


  htitle: string = 'Dashboard de Datos';
  hsubtitle: string = 'Gestión de Datos Estratégicos / Casa Central';
  


  buttons: ButtonData[] = [
    { eb_icon: 'sync_alt', eb_title: 'Rotación', eb_subtitle: 'Ejemplo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/personas/rotacion' },
    { eb_icon: 'hourglass_empty', eb_title: 'Permanencia', eb_subtitle: 'Ejemplo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/personas/permanencia' },
    { eb_icon: 'event_busy', eb_title: 'Ausentismo', eb_subtitle: 'Ejemplo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/personas/ausentismo' },
    { eb_icon: 'groups', eb_title: 'Planta Contratada', eb_subtitle: 'Ejemplo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/personas/planta_contratada' },
    { eb_icon: 'person_off', eb_title: 'Vacancia de la planta', eb_subtitle: '', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'today', eb_title: 'Días LM (Planta)', eb_subtitle: '', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'school', eb_title: 'LM por trabajador de planta', eb_subtitle: '', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'menu_book', eb_title: 'Días LM por Licencia (Planta)', eb_subtitle: '', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'apartment', eb_title: 'Cantidad LM (Planta)', eb_subtitle: '', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'calendar_today', eb_title: 'Días LM por trabajador de planta', eb_subtitle: '', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' }
  ];
  

  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  selectButton(index: number): void {
    this.buttonStateService.setActiveButton(index);
  }
}
