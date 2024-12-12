import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElemButtonComponent } from '../elem-button/elem-button.component'; // Importa el botón

import { EducacionService } from '../../services/educacion.services';

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
  selector: 'app-view-educacion',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ElemButtonComponent
  ],
  templateUrl: './view-educacion.component.html',
  styleUrls: ['./view-educacion.component.css'],
})

export class ViewEducacionComponent {

  public buttonStateService = inject(ButtonStateService);

  buttons: ButtonData[] = [
    { eb_icon: 'school', eb_title: 'NEE', eb_subtitle: 'Ejemplo', eb_disable: false , eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/educacion/nee'},
    { eb_icon: 'person', eb_title: 'ATET', eb_subtitle: 'Ejemplo', eb_disable: false , eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/educacion/atet'},
    { eb_icon: 'family_restroom', eb_title: 'Familias', eb_subtitle: 'Data disponible 2025', eb_disable: false, eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/educacion/familia'},
    { eb_icon: 'analytics', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true , eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/'},
    { eb_icon: 'analytics', eb_title: 'Indicador 2', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true , eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/'},
    { eb_icon: 'business', eb_title: 'Indicador 3', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true , eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/'},
    { eb_icon: 'insights', eb_title: 'Indicador 4', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true , eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/'},
    { eb_icon: 'bar_chart', eb_title: 'Indicador 5', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true , eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/'},
    { eb_icon: 'insert_chart', eb_title: 'Indicador 6', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fdba74', eb_text_color: '#334155', eb_link: '/' }
  ];

  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  onButtonClick(index: number): void {
    this.buttonStateService.setActiveButton(index);
  }





  constructor(private educacionService: EducacionService) {}

  ngOnInit(): void {
    this.loadData();
  }

  v1: string = '';

  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    this.educacionService.getCantidadTotal(ano, codigoRegion).subscribe({
      next: (res) => {
        this.v1 = `${res.data.cantidadTotal}`;
      },
      error: (err) => {
        console.error('Error al cargar el resumen de necesidades:', err);
      },
    });

  //   this.educacionService.getResumenNecesidades(ano, codigoRegion).subscribe({
  //     next: (res) => {
  //       console.log(`OK---------->getResumenNecesidades`,);
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.error('Error---------->getResumenNecesidades :', err);
  //     },
  //   });
    
  //   {
  //     "permanente": 60.9,
  //     "transitoria": 19.2,
  //     "rezago": 19.9
  // }
  
  }

}

