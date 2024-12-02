import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../shared/animations';
import { faBriefcase, faClipboard, faGavel, faLaptopCode, faCogs, faFileAlt, faCircle, faBook, faUsers, faSchool, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { RegionService } from '../services/region.service'; // Importar el servicio
import { Region } from '../models/region-data.model';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
})
export class SidebarComponent {
    active = false;
    store: any;
    activeDropdown: string[] = [];
    parentDropdown: string = '';
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
    regions: Region[] = [];

    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private regionService: RegionService // Inyectar el servicio de regiones
    ) {
        this.initStore();
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    ngOnInit() {
        this.setActiveDropdown();
        this.loadRegions();
    }

    setActiveDropdown() {
        const selector = document.querySelector('.sidebar ul a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    loadRegions() {
        this.regionService.getRegions().subscribe({
            next: (response: any) => {
                console.log('Respuesta completa de la API:', response);
    
                // Verifica si existe el campo `data` en la respuesta
                if (response && response.data) {
                    this.regions = response.data.map((region: any) => ({
                        nombreRegion: region.NombreRegion, // Cambia según el nombre correcto de las propiedades
                        codigoRegion: region.CodigoRegion
                    }));
                } else {
                    console.error('El campo "data" no está presente en la respuesta.');
                    this.regions = []; // Inicializar vacío en caso de error
                }
    
                console.log('Regiones procesadas:', this.regions);
            },
            error: (err) => {
                console.error('Error al obtener regiones:', err);
            }
        });
    }
    
    
    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }
    }

    updateMap(regionId: number) {
        // Aquí debes implementar la lógica para actualizar el mapa según la región seleccionada.
        this.regionService.setRegion(regionId);
        console.log(`Mapa actualizado para la región: ${regionId}`);
    }
}
