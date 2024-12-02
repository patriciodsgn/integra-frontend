import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/login.services';
import {
  faClipboard, faGavel, faLaptopCode, faCogs, faFileAlt,
  faCircle, faBook, faUsers, faSchool, 
} from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt, faUniversity, faBuilding, faBriefcase, faIndustry, faFile,faChartBar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.html',
})
export class SidebarComponent implements OnInit {
  [x: string]: any;
  toggleSidebar() {
    throw new Error('Method not implemented.');
  }

  activeDropdown: string[] = [];
  store: any = {}; // Asegurar inicialización
  isUserDataLoaded: boolean = false; // Bandera para verificar si los datos del usuario están cargados
  regions: any[] = [];
  directions: any[] = [];

  // Íconos
  icons = [
    faMapMarkerAlt, // Icono para la primera dirección
    faUniversity,   // Icono para la segunda dirección
    faBuilding,     // Icono para la tercera dirección
    faBriefcase,    // Icono para la cuarta dirección
    faIndustry      // Icono para la quinta dirección, y así sucesivamente...
  ];

  faBriefcase = faBriefcase;
  faClipboard = faClipboard;
  faBook = faBook;
  faUsers = faUsers;
  faGavel = faGavel;
  faLaptopCode = faLaptopCode;
  faCogs = faCogs;
  faFileAlt = faFileAlt;
  faBuilding = faBuilding;
  faCircle = faCircle;
  faSchool = faSchool;
  faMapMarkerAlt = faMapMarkerAlt;
  faFile=faFile;
  faChartBar=faChartBar;

  constructor(
    private authService: AuthService,
    public storeData: Store<any>,
    private router: Router
  ) {}

  ngOnInit() {
    this.initStore();
    this.loadSidebarData();
  }

  async initStore() {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        this.store = d || {};
      });
  }

  /**
   * Cargar los datos del usuario (regiones y direcciones) para el sidebar.
   */
  loadSidebarData() {
    this.authService.usuario$.subscribe((usuario) => {
      if (usuario && usuario.permisos) {
        // Filtrar las regiones
        this.regions = usuario.permisos
          .filter((permiso: any) => permiso.TipoCategoria === 'REGION')
          .map((region: any) => ({
            nombre: region.NombrePermiso || 'Región sin nombre',
            codigo: region.ValorCategoria || '',
          }));

        // Filtrar las direcciones
        this.directions = usuario.permisos
          .filter((permiso: any) => permiso.TipoCategoria === 'DIRECCION')
          .map((direccion: any, index: number) => ({
            nombre: direccion.NombrePermiso || 'Dirección sin nombre',
            codigo: direccion.ValorCategoria || '',
            icon: this.icons[index % this.icons.length] // Asignar un ícono distinto a cada dirección
          }));

        this.isUserDataLoaded = true; // Indicar que los datos están cargados
        console.log('Regiones procesadas:', this.regions);
        console.log('Direcciones procesadas:', this.directions);
      } else {
        console.error('No se encontraron permisos para regiones o direcciones.');
        this.regions = [];
        this.directions = [];
        this.isUserDataLoaded = true; // Incluso si no hay datos, marcamos como cargado
      }
    });
  }

  toggleAccordion(name: string) {
    if (this.activeDropdown.includes(name)) {
      this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
    } else {
      this.activeDropdown.push(name);
    }
  }
  getDirectionLink(direccion: any): string {
    const category = direccion.codigo?.toLowerCase();
    const routeMap: { [key: string]: string } = {
      'educacion': '/educacion',
      'ejecutiva': '/ejecutiva',
      'dppi': '/dppi',
      'dpgr': '/dpgr',
      'daft': '/daft',
      'personas': '/personas',
      'costos': '/costos',
    };
  
    return routeMap[category] || `/direccion/${direccion.codigo}`;
  }
}
