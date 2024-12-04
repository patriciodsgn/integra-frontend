import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elem-bar1',
  standalone: true,
  templateUrl: './elem-bar1.component.html',
  styleUrls: ['./elem-bar1.component.css'] // Corregido 'styleUrls'
})
export class ElemBar1Component {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
