import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DashboardStateService {
    private regionSource = new BehaviorSubject<number>(0);
    private vistaNacionalSource = new BehaviorSubject<boolean>(true);

    // Observables para los componentes
    region$ = this.regionSource.asObservable();
    vistaNacional$ = this.vistaNacionalSource.asObservable();

    constructor(private router: Router) {}

    // Getter para la región actual
    get selectedRegion(): number {
        return this.regionSource.value;
    }

    // Getter para el tipo de vista
    get vistaNacional(): boolean {
        return this.vistaNacionalSource.value;
    }

    // Navegar a vista regional
    irAVistaRegional(region: number) {
        this.regionSource.next(region);
        this.vistaNacionalSource.next(false);
        this.router.navigate(['/dashboard/regional']);
    }

    // Navegar a vista nacional
    irAVistaNacional() {
        this.regionSource.next(0);
        this.vistaNacionalSource.next(true);
        this.router.navigate(['/dashboard/nacional']);
    }
    // Método para inicializar la vista nacional
    initializeNationalView() {
        this.regionSource.next(0);
        this.vistaNacionalSource.next(true);
    }

    // Método para cambiar a vista regional
    setRegionalView(region: number) {
        this.regionSource.next(region);
        this.vistaNacionalSource.next(false);
    }
}