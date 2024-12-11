import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ElemButtonComponent } from '../elem-button/elem-button.component'; // Importa el botón

import { CostoService } from '../../services/costo.service';

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
  selector: 'app-view-costos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ElemButtonComponent
  ],
  templateUrl: './view-costos.component.html',
  styleUrl: './view-costos.component.css'
})


export class ViewCostosComponent {

  public buttonStateService = inject(ButtonStateService);

  buttons: ButtonData[] = [
    { eb_icon: 'trending_up', eb_title: 'Evolución', eb_subtitle: 'Costos Matrícula', eb_disable: false, eb_bg_color: '#fcd34d', eb_text_color: '#334155', eb_link: '/costos/evolucion' },
    { eb_icon: 'attach_money', eb_title: 'Costo Promedio', eb_subtitle: 'Matrícula Anual', eb_disable: true, eb_bg_color: '#fcd34d', eb_text_color: '#334155', eb_link: '/costos/promedio'  },
    { eb_icon: 'trending_up', eb_title: 'Incremento Anual', eb_subtitle: 'Costos Matrícula', eb_disable: true, eb_bg_color: '#fcd34d', eb_text_color: '#334155', eb_link: '/costos/incremento'  },
    { eb_icon: 'pie_chart', eb_title: 'Distribución', eb_subtitle: 'Gasto por Categoría', eb_disable: true, eb_bg_color: '#fcd34d', eb_text_color: '#334155', eb_link: '/costos/distribucion'  },
    { eb_icon: 'school', eb_title: 'Matrículas Totales', eb_subtitle: 'Año Actual', eb_disable: true, eb_bg_color: '#fcd34d', eb_text_color: '#334155', eb_link: '/costos/matriculas'  },
    { eb_icon: 'show_chart', eb_title: 'Tendencias', eb_subtitle: 'Histórico de Costos', eb_disable: true, eb_bg_color: '#fcd34d', eb_text_color: '#334155', eb_link: '/costos/tendencias'  }
  ]


  get activeButtonIndex(): number | null {
    return this.buttonStateService.activeButton();
  }

  onButtonClick(index: number): void {
    this.buttonStateService.setActiveButton(index); // Cambia el botón activo
    console.log(`Botón seleccionado: ${this.buttons[index].eb_title}`);
  }




  constructor(private costoService: CostoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  cardValue1: string = '';

public loadData(): void {
  const year = 2023;
  const codigoRegion = 0;

  // this.dpgrService.getCostEvolution(year).subscribe({
  //   next: (res) => {
  //     console.log('Respuesta de evolución de costos:', res); // Mostrar la respuesta en consola
  //     // Asigna la respuesta a tu variable si es necesario
  //     this.cardValue1 = res.someKey || 'No disponible'; // Ajusta según la estructura de respuesta
  //   },
  //   error: (err) => {
  //     console.error('Error al obtener evolución de costos:', err);
  //   },
  // });

}




}










