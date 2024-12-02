import { Component } from '@angular/core';
import { ElemHeaderComponent } from '../elem-header/elem-header.component';
import { ElemCardGrid1Component } from '../elem-card-grid1/elem-card-grid1.component';
import { ElemCardGrid2Component } from '../elem-card-grid2/elem-card-grid2.component';
import { ElemCardGrid3Component } from '../elem-card-grid3/elem-card-grid3.component';
import { ElemButtonComponent } from '../elem-button/elem-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-home',
  standalone: true,
  imports: [
    ElemHeaderComponent,
    ElemButtonComponent,
    ElemCardGrid1Component,
    ElemCardGrid2Component,
    ElemCardGrid3Component,
  ],
  templateUrl: './view-home.component.html',
  styleUrl: './view-home.component.css'
})
export class ViewHomeComponent {


  constructor(private router: Router) {}

  // Navegación programática
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}








