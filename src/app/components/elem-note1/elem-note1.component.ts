import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elem-note1',
  standalone: true,
  imports: [],
  templateUrl: './elem-note1.component.html',
  styleUrl: './elem-note1.component.css'
})
export class ElemNote1Component {
  @Input() note: string = '';
}




