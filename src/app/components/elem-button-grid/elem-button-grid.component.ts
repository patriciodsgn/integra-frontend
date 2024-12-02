import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ElemButtonComponent } from '../elem-button/elem-button.component';
import { CommonModule } from '@angular/common';

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
  selector: 'app-elem-button-grid',
  standalone: true,
  imports: [ElemButtonComponent, CommonModule],
  templateUrl: './elem-button-grid.component.html',
  styleUrls: ['./elem-button-grid.component.css'],
})
export class ElemButtonGridComponent {
  @Input() button_data: ButtonData[] = [];
  @Input() activeIndex: number | null = null; // Índice del botón activo
  @Output() selectButton = new EventEmitter<number>(); // Emitir eventos

  // Método para manejar clics en botones
  onButtonClick(index: number): void {
    this.selectButton.emit(index);
  }
}
