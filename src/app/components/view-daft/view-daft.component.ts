import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ElemButtonComponent } from '../elem-button/elem-button.component'; // Importa el botón

import { PresupuestoService } from '../../services/presupuesto.service';

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
  selector: 'app-view-daft',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ElemButtonComponent
  ],
  templateUrl: './view-daft.component.html',
  styleUrls: ['./view-daft.component.css'],
})

export class ViewDaftComponent {

  public buttonStateService = inject(ButtonStateService);

  buttons: ButtonData[] = [
    { eb_icon: 'bar_chart', eb_title: 'Ejecución Presupuestaria', eb_subtitle: 'Presupuesto Total', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/daft/ejecucion_presupuestaria' },
    { eb_icon: 'account_balance_wallet', eb_title: 'Saldo por Ejecutar', eb_subtitle: 'Presupuesto Restante', eb_disable: false, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '/daft/saldo_por_ejecutar' },
    { eb_icon: 'savings', eb_title: 'Presupuesto Comprometido', eb_subtitle: 'Fondos Reservados', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'percent', eb_title: 'Porcentaje de Ejecución', eb_subtitle: 'Progreso Financiero', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'credit_card', eb_title: 'Total Anticipos', eb_subtitle: 'Fondos Adelantados', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'business', eb_title: 'Gastos por Fondo', eb_subtitle: 'Detalles Ejecución', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'money_off', eb_title: 'Gastos Ejecutados', eb_subtitle: 'Dinero Gastado', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'swap_horiz', eb_title: 'Total Reasignado', eb_subtitle: 'Presupuesto Ajustado', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'attach_money', eb_title: 'Gastos por Centro de Costo', eb_subtitle: 'Desglose Ejecución', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'report_problem', eb_title: 'Presupuestos Negativos', eb_subtitle: 'Informes', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' },
    { eb_icon: 'assessment', eb_title: 'Rendición y Costos CMM', eb_subtitle: '', eb_disable: true, eb_bg_color: '#5eead4', eb_text_color: '#115e59', eb_link: '' }
  ];
  
  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  onButtonClick(index: number): void {
    this.buttonStateService.setActiveButton(index); // Cambia el botón activo
    console.log(`Botón seleccionado: ${this.buttons[index].eb_title}`);
  }





  constructor(private presupuestoService: PresupuestoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  cardValue1: string = '';

  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    this.presupuestoService.obtenerPresupuestoVsEjecutado({ ano }).subscribe({
      next: (res) => {
        console.log('ok obtenerPresupuestoVsEjecutado ------>', res);
        // this.cardValue1 = `${res}`; 
      },
      error: (err) => {
        console.error('Error obtenerPresupuestoVsEjecutado ------>:', err);
      },
    });
    
    // this.presupuestoService.obtenerGastosVsSaldo({ ano }).subscribe({
    //   next: (res) => {
    //     console.log('-------------->', res);
    //     // this.cardValue1 = `${res}`; 
    //   },
    //   error: (err) => {
    //     console.error('-----Error al cargar-----:', err);
    //   },
    // });


    
  }
}
