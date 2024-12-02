import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import VariablePie from 'highcharts/modules/variable-pie';
import BellCurve from 'highcharts/modules/histogram-bellcurve';
import PatternFill from 'highcharts/modules/pattern-fill';
import PictorialModule from 'highcharts/modules/pictorial';
import ItemSeries from 'highcharts/modules/item-series';

// Inicializar módulos de Highcharts
if (typeof Highcharts === 'object') {
    HighchartsMore(Highcharts);
    Highcharts3D(Highcharts);
    HighchartsSolidGauge(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    HighchartsAccessibility(Highcharts);
    ItemSeries(Highcharts);
    VariablePie(Highcharts);
    BellCurve(Highcharts);
    PatternFill(Highcharts);
    PictorialModule(Highcharts);
}

@Component({
    selector: 'app-indicadores-dashboard',
    templateUrl: './indicadores-dashboard.component.html'
})
export class IndicadoresDashboardComponent implements OnInit {
applyFilter() {
  this.showPortadaIndicadores = this.selectedSegments.includes('PORTADA');
  this.showNutritionDashboard = this.selectedSegments.includes('ALIMENTACION Y SALUD');
  this.showIndigenousPeoplesDashboard = this.selectedSegments.includes('DPGR');
  
  this.showMigrantsDashboard = this.selectedSegments.includes('DPGR');
  this.showNeeDashboard = this.selectedSegments.includes('DPGR');
  this.showFamilySurveyDashboard = this.selectedSegments.includes('DIRECCION EJECUTIVA');
  this.showDashboardAccidentes = this.selectedSegments.includes('ACCIDENTES');
  this.showDashboardReconocimiento = this.selectedSegments.includes('DPGR');
  this.showDashboardSelloVerde = this.selectedSegments.includes('SELLO VERDE');
  // Cierra el menú desplegable
  this.isDropdownOpen = false;
  this.updateCharts();
}

    // Variables de control de paneles
    showPortadaIndicadores: boolean = false;
    showNutritionDashboard: boolean = false;
    showIndigenousPeoplesDashboard: boolean = false;
    showMigrantsDashboard: boolean = false;
    showNeeDashboard: boolean = false;
    showFamilySurveyDashboard: boolean = false;
    showDashboardAccidentes: boolean = false;
    showDashboardReconocimiento: boolean = false;
    showDashboardSelloVerde: boolean = false;

    // Propiedades de Highcharts
    Highcharts: typeof Highcharts = Highcharts;
    chartConstructor = 'chart';
    updateFlag = false;

    // Filtros y datos
    selectedYear: number = 2024;
    selectedRegion: string = 'Gran Santiago Nor Poniente';
    startDate: string = '2024-09-09';
    endDate: string = '2024-10-10';

    indicators = {
        establishments: 116,
        kindergartenAndNursery: 80,
        kindergarten: 28,
        nursery: 6,
        nonConventional: 80,
        wheelsKindergarten: 8
    };

    selectedOptions: string[] = [];
    selectedSegments: string[] = [];
    isDropdownOpen: boolean = false;

    years: number[] = [2021, 2022, 2023, 2024];
    segments: string[] = [
        'PORTADA',
        'ALIMENTACION Y SALUD',
        'EQUIDAD E INCLUSIÓN',
        'DIRECCION EJECUTIVA',
        'INFRAESTRUCTURA',
        'SEGURIDAD',
        'EDUCACIÓN',
        'DPGR'
    ];



    showFilterBar: boolean = true;
    dataSteward: string = 'XXXXXXXXXXXXXXXX';

    constructor() {}

    ngOnInit() {}

    // Método para aplicar filtros
    applyFilters() {
        console.log('Applying filters:', {
            year: this.selectedYear,
            region: this.selectedRegion,
            segments: this.selectedSegments,
            dateRange: [this.startDate, this.endDate]
            
        });
        
    }

    exportToPDF() {
        console.log('Exporting to PDF...');
    }

    private updateCharts() {
        this.updateFlag = true;
    }

    onYearChange(year: number) {
        this.selectedYear = year;
        this.applyFilters();
    }

    onRegionChange(region: string) {
        this.selectedRegion = region;
        this.applyFilters();
    }

    onDateRangeChange(startDate: string, endDate: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.applyFilters();
    }

    // Alternar selección de segmento individual
    toggleSegment(segment: string) {
        const index = this.selectedSegments.indexOf(segment);
        if (index === -1) {
            this.selectedSegments.push(segment);
        } else {
            this.selectedSegments.splice(index, 1);
        }
        this.applyFilters();
    }

    isSelected(segment: string): boolean {
        return this.selectedSegments.includes(segment);
    }

    // Verificar si todos los segmentos están seleccionados
    allSegmentsSelected(): boolean {
        return this.selectedSegments.length === this.segments.length;
    }

    // Seleccionar o deseleccionar todos los segmentos
    toggleAllSegments(event: Event) {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.selectedSegments = [...this.segments];
        } else {
            this.selectedSegments = [];
        }
        this.applyFilters();
    }

    toggleFilterBar() {
        this.showFilterBar = !this.showFilterBar;
    }

    filtrar() {
        this.resetPanels();
        this.selectedOptions.forEach(option => {
            switch (option) {
                case 'PORTADA':
                    this.showPortadaIndicadores = true;
                    break;
                case 'ALIMENTACION Y SALUD':
                    this.showNutritionDashboard = true;
                    break;
                case 'DIRECCION EJECUTIVA':
                    this.showFamilySurveyDashboard = true;
                    break;
                case 'DPGR':
                    this.showIndigenousPeoplesDashboard = true;
                    this.showNeeDashboard = true;
                    this.showMigrantsDashboard=true;
                    this.showDashboardReconocimiento=true;
                    this.showDashboardSelloVerde=true;
                    break;
                case 'SEGURIDAD':
                    this.showDashboardAccidentes = true;
                    break;
                case 'EDUCACIÓN':
                    this.showNeeDashboard = true;
                    break;
            }
        });
    }

    resetPanels() {
        this.showPortadaIndicadores = false;
        this.showNutritionDashboard = false;
        this.showIndigenousPeoplesDashboard = false;
        this.showMigrantsDashboard = false;
        this.showNeeDashboard = false;
        this.showFamilySurveyDashboard = false;
        this.showDashboardAccidentes = false;
        this.showDashboardReconocimiento = false;
        this.showDashboardSelloVerde = false;
 
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }
}
