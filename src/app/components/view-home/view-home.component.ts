// view-home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElemHeaderComponent } from '../elem-header/elem-header.component';
import { ElemButtonComponent } from '../elem-button/elem-button.component';
import { ElemCardGrid1Component } from '../elem-card-grid1/elem-card-grid1.component';
import { ElemCardGrid2Component } from '../elem-card-grid2/elem-card-grid2.component';
import { ElemCardGrid3Component } from '../elem-card-grid3/elem-card-grid3.component';

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
// view-home.component.ts
export class ViewHomeComponent implements OnInit {
  nivelAcceso: string = '';
  codigoRegion: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    try {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const userDataObj = JSON.parse(storedData);
        this.nivelAcceso = userDataObj.datosUsuario?.nivelAcceso;
        this.codigoRegion = userDataObj.region?.CodigoRegion?.toString();
        console.log('Datos cargados:', { nivelAcceso: this.nivelAcceso, codigoRegion: this.codigoRegion });
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  }

  handleDatosEstrategicosClick() {
    console.log('handleDatosEstrategicosClick llamado');
    console.log('nivelAcceso:', this.nivelAcceso);
    console.log('codigoRegion:', this.codigoRegion);

    if (this.nivelAcceso === 'Regional' && this.codigoRegion) {
      const url = `/region/${this.codigoRegion}`;
      console.log('Navegando a:', url);
      this.router.navigate([url])
        .then(() => console.log('Navegación exitosa'))
        .catch(err => console.error('Error en navegación:', err));
    } else {
      console.log('Navegando a dashboard inicial');
      this.router.navigate(['/custom-dashboard-inicial']);
    }
  }
}