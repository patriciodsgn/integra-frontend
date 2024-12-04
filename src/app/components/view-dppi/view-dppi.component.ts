import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';

// import { DppiService } from '../../services/dppi.services';

import { RouterModule } from '@angular/router';
import { ButtonStateService } from '../../button-state.service';
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
  selector: 'app-view-dppi',
  standalone: true,
  imports: [
    RouterModule,
    ElemButtonGridComponent,
  ],
  templateUrl: './view-dppi.component.html',
  styleUrls: ['./view-dppi.component.css'],
})

export class ViewDppiComponent {
  public buttonStateService = inject(ButtonStateService);
  
  buttons: ButtonData[] = [
    { eb_icon: 'local_hospital', eb_title: 'Accidentes', eb_subtitle: '', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dppi/accidentes' },
    { eb_icon: 'restaurant', eb_title: 'Situación Nutricional', eb_subtitle: '', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dppi/situacion_nutricional' },
    { eb_icon: 'child_care', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'emergency', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'groups', eb_title: 'Indicador', eb_subtitle: 'Gobierno de Datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'groups', eb_title: 'inIndicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'apartment', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'verified', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'school', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'menu_book', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'monetization_on', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'savings', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' }
  ];

  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  selectButton(index: number): void {
    this.buttonStateService.setActiveButton(index);
  }


  // constructor(private dppiService: DppiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  cardValue1: string = '';

  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    // this.dppiService.getCantidadTotal(ano, codigoRegion).subscribe({
    //   next: (res) => {
    //     this.cardValue1 = `${res.data.cantidadTotal}`;
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar el resumen de necesidades:', err);
    //   },
    // });
  }



}
