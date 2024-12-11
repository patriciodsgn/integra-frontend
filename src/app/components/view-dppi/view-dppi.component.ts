import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ElemButtonComponent } from '../elem-button/elem-button.component'; // Importa el botón

import { DppiService } from '../../services/dppi.service';

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
  selector: 'app-view-dppi',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ElemButtonComponent
  ],
  templateUrl: './view-dppi.component.html',
  styleUrls: ['./view-dppi.component.css'],
})

export class ViewDppiComponent {

  public buttonStateService = inject(ButtonStateService);
  
  buttons: ButtonData[] = [
    { eb_icon: 'local_hospital', eb_title: 'Accidentes', eb_subtitle: '', eb_disable: false, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '/dppi/accidentes' },
    { eb_icon: 'restaurant', eb_title: 'Situación Nutricional', eb_subtitle: '', eb_disable: false, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '/dppi/situacion_nutricional' },
    { eb_icon: 'child_care', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'emergency', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'groups', eb_title: 'Indicador', eb_subtitle: 'Gobierno de Datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'groups', eb_title: 'inIndicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'apartment', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'verified', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'school', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'menu_book', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'monetization_on', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' },
    { eb_icon: 'savings', eb_title: 'Indicador 1', eb_subtitle: 'Gobierno de datos - En desarrollo', eb_disable: true, eb_bg_color: '#fce7f3', eb_text_color: '#334155', eb_link: '' }
  ];

  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  onButtonClick(index: number): void {
    this.buttonStateService.setActiveButton(index);
    console.log(`Botón seleccionado: ${this.buttons[index].eb_title}`);
  }


  constructor(private dppiService: DppiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  v1: string = 'v1';
  v2: string = 'v2';
  
  v3: string = 'v3';
  v4: string = 'v4';
  v5: string = 'v5';
  v6: string = 'v6';

  v7: string = 'v7';


  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    this.dppiService.getTotalAccidentes(ano, codigoRegion).subscribe({
      next: (res) => {
        // console.error('----------Ok al cargar:', res.data.resumen.TotalAccidentesNacional);
        // console.error('----------Ok al cargar:', res.data.resumen.TotalNinosAfectadosNacional);
        // console.error('----------Ok al cargar:', res.data.TotalAccidentesNacional);
        this.v1 = `${res.data.resumen.TotalAccidentesNacional}`;
        this.v2 = `${res.data.resumen.TotalNinosAfectadosNacional}`;
    },
      error: (err) => {
        console.error('----------Error al cargar:', err);
      },
    });

    this.dppiService.getTotalesDiagnosticoNutricional(ano, codigoRegion).subscribe({
      next: (res) => {
        this.v3 = `${res.data.diagnosticos.normal}`;
        this.v4 = `${res.data.diagnosticos.obesidad}`;
        this.v5 = `${res.data.diagnosticos.sobrepeso}`;
        this.v6 = `${res.data.diagnosticos.deficit}`;
        this.v7 = `${res.data.totalEvaluados}`;
    },
      error: (err) => {
        console.error('----------Error al cargar:', err);
      },
    });






    // this.dppiService.getInformacionGeografica(ano, codigoRegion).subscribe({
    //   next: (res) => {
    //     console.error('---------- getInformacionGeografica:', res);
    //     // this.v7 = `${res.data.totalEvaluados}`;
    // },
    //   error: (err) => {
    //     console.error('---------- Error getInformacionGeografica:', err);
    //   },
    // });


    // this.dppiService.getInformacionGeografica(ano, codigoRegion).subscribe({
    //   next: (res) => {
    //     console.error('---------- getInformacionGeografica:', res);
    //     // this.v7 = `${res.data.totalEvaluados}`;
    // },
    //   error: (err) => {
    //     console.error('---------- Error al cargar:', err);
    //   },
    // });


    this.dppiService.getParticipacionEncuestados(ano, codigoRegion).subscribe({
      next: (res) => {
        console.error('---------- getParticipacionEncuestados:', res);
        // this.v7 = `${res.data.totalEvaluados}`;
    },
      error: (err) => {
        console.error('---------- Error al cargar:', err);
      },
    });

  
  }
}
