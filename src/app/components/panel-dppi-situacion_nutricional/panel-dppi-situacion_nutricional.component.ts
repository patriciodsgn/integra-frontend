import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DppiService } from '../../services/dppi.service';


@Component({
  selector: 'app-panel-dppi-situacion_nutricional',
  standalone: true,
  imports: [],
  templateUrl: './panel-dppi-situacion_nutricional.component.html',
  styleUrl: './panel-dppi-situacion_nutricional.component.css'
})
export class PanelDppiSituacion_nutricionalComponent implements OnInit {

  selectedYear: number = 2022; // Año seleccionado por defecto

  constructor(private dppiService: DppiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onYearChange(event: Event): void {
    const year = (event.target as HTMLSelectElement).value;
    this.selectedYear = parseInt(year, 10);
    this.loadData(); // Recarga los datos cuando se cambia el año
  }


  private loadData(): void {
    const ano = this.selectedYear;
    const codigoRegion = 0;

    this.dppiService.getParticipacionEncuestados(ano, codigoRegion).subscribe({
      next: (res) => {
        console.error('OK---------->getParticipacionEncuestados:', res);
        // this.v7 = `${res.data.totalEvaluados}`;
    },
      error: (err) => {
        console.error('Error---------->getParticipacionEncuestados:', err);
      },
    });
  }

}
