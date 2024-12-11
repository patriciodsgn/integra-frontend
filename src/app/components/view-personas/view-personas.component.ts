import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ElemButtonComponent } from '../elem-button/elem-button.component'; // Importa el botón

// import { PersonasService } from '../../services/personas.services';

import { RouterModule } from '@angular/router';
import { ButtonStateService } from '../../button-state.service';

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
    CommonModule,
    ElemButtonComponent
  ],
  templateUrl: './view-personas.component.html',
  styleUrls: ['./view-personas.component.css'],
})

export class ViewPersonasComponent {

  public buttonStateService = inject(ButtonStateService);

  buttons: ButtonData[] = [
    { eb_icon: 'sync_alt', eb_title: 'Rotación', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '/personas/rotacion' },
    { eb_icon: 'hourglass_empty', eb_title: 'Permanencia', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '/personas/permanencia' },
    { eb_icon: 'event_busy', eb_title: 'Ausentismo', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '/personas/ausentismo' },
    { eb_icon: 'groups', eb_title: 'Planta Contratada', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '/personas/planta_contratada' },
    { eb_icon: 'person_off', eb_title: 'Vacancia de la planta', eb_subtitle: '', eb_disable: true, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'today', eb_title: 'Días LM (Planta)', eb_subtitle: '', eb_disable: true, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'school', eb_title: 'LM por trabajador de planta', eb_subtitle: '', eb_disable: true, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'menu_book', eb_title: 'Días LM por Licencia (Planta)', eb_subtitle: '', eb_disable: true, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'apartment', eb_title: 'Cantidad LM (Planta)', eb_subtitle: '', eb_disable: true, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'calendar_today', eb_title: 'Días LM por trabajador de planta', eb_subtitle: '', eb_disable: true, eb_bg_color: '#a7f3d0', eb_text_color: '#334155', eb_link: '' }
  ];
  

  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  onButtonClick(index: number): void {
    this.buttonStateService.setActiveButton(index); // Cambia el botón activo
    console.log(`Botón seleccionado: ${this.buttons[index].eb_title}`);
  }




  // constructor(private personasService: PersonasService) {}

  ngOnInit(): void {
    this.loadData();
  }

  cardValue1: string = '';

  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    // this.personasService.getCantidadTotal(ano, codigoRegion).subscribe({
    //   next: (res) => {
    //     this.cardValue1 = `${res.data.cantidadTotal}`;
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar el resumen de necesidades:', err);
    //   },
    // });
  }



}
