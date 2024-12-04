import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elem-header',
  standalone: true,
  imports: [],
  templateUrl: './elem-header.component.html',
  styleUrl: './elem-header.component.css'
})

export class ElemHeaderComponent {
  @Input() eh_title: string = 'Titulo_ts';
  @Input() eh_subtitle: string = 'Subtitulo_ts';
  @Input() eh_bg_color: string = '#b2b2b2';
  @Input() eh_text_color: string = '#27272a';
}
