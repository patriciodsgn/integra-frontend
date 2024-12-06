import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ElemButtonComponent } from '../elem-button/elem-button.component'; // Importa el botón

import { DpgrService } from '../../services/dpgr.services';

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
  selector: 'app-view-dpgr',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ElemButtonComponent
  ],
  templateUrl: './view-dpgr.component.html',
  styleUrls: ['./view-dpgr.component.css'],
})

export class ViewDpgrComponent {

  public buttonStateService = inject(ButtonStateService);

  buttons: ButtonData[] = [
    { eb_icon: 'favorite', eb_title: 'RO', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dpgr/ro' },
    { eb_icon: 'eco', eb_title: 'Sello Verde', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dpgr/sello_verde' },
    { eb_icon: 'groups', eb_title: 'Pueblos Originarios', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dpgr/pueblos_originarios' },
    { eb_icon: 'public', eb_title: 'Nacionalidad', eb_subtitle: 'Ejemplo', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/dpgr/nacionalidad' },
    { eb_icon: 'assignment', eb_title: 'Asistencia', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'access_time', eb_title: 'Permanencia', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'error_outline', eb_title: 'Inasistencia', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'business', eb_title: 'Establecimientos', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'wc', eb_title: 'Sexo', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'analytics', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'monetization_on', eb_title: 'Indicador 2', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' }
  ];
  

  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  onButtonClick(index: number): void {
    this.buttonStateService.setActiveButton(index); // Cambia el botón activo
    console.log(`Botón seleccionado: ${this.buttons[index].eb_title}`);
  }


  constructor(private dpgrService: DpgrService) {}

  ngOnInit(): void {
    this.loadData();
  }

  v1: string = '-';
  v2: string = '-';
  v3: string = '-';
  v4: string = '-';
  v5: string = '-';
  v6: string = '-';

  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    this.dpgrService.getConteoJardines(codigoRegion).subscribe({
      next: (res) => {
        // console.log('------------>ok:', res.summary.totalGeneral);
        this.v1 = `${res.summary.totalGeneral}`;
      },
      error: (err) => {
        console.error('------------>Error:', err);
      },
    });

    this.dpgrService.getTotalNinosOriginarios(ano, codigoRegion).subscribe({
      next: (res) => {
        // console.log('------------>ok3:', res.data.totalNinosOriginarios);
        this.v3 = `${res.data.totalNinosOriginarios}`;
      },
      error: (err) => {
        console.error('------------>Error:', err);
      },
    });

    this.dpgrService.getTotalNinosMigrantes(ano, codigoRegion).subscribe({
      next: (res) => {
        // console.log('------------>ok4:', res.data.totales.totalNinosMigrantes);
        this.v4 = `${res.data.totales.totalNinosMigrantes}`;
      },
      error: (err) => {
        console.error('------------>Error:', err);
      },
    });

    this.dpgrService.getTotalJardinesRO(codigoRegion).subscribe({
      next: (res) => {
        // console.log('------------>ok5:', res.data.totalJardinesConRO);
        this.v5 = `${res.data.totalJardinesConRO}`;
      },
      error: (err) => {
        console.error('------------>Error:', err);
      },
    });

    this.dpgrService.getTotalJardinesSelloVerde(ano, codigoRegion).subscribe({
      next: (res) => {
        // console.log('------------>okv6:', res.data.totalJardines);
        this.v6 = `${res.data.totalJardines}`;
      },
      error: (err) => {
        console.error('------------>Error:', err);
      },
    });





  }
}

