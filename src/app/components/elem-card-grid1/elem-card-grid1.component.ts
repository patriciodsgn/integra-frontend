import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elem-card-grid1',
  standalone: true,
  templateUrl: './elem-card-grid1.component.html',
  styleUrls: ['./elem-card-grid1.component.css'],
})
export class ElemCardGrid1Component {
  // Colores
  @Input() ec_bg_card_grid_color: string = '';
  @Input() ec_bg_card_color: string = '';
  @Input() ec_text_card_color1: string = '';
  @Input() ec_text_card_color2: string = '';

  // Valores y etiquetas
  @Input() ec_value1: string = '';
  @Input() ec_label1: string = '';
  @Input() ec_value2: string = '';
  @Input() ec_label2: string = '';
  @Input() ec_value3: string = '';
  @Input() ec_label3: string = '';
  @Input() ec_value4: string = '';
  @Input() ec_label4: string = '';
  @Input() ec_value5: string = '';
  @Input() ec_label5: string = '';
  @Input() ec_value6: string = '';
  @Input() ec_label6: string = '';
}
