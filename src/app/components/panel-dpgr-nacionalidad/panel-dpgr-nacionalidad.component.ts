import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';

@Component({
  selector: 'app-panel-dpgr-nacionalidad',
  standalone: true,
  imports: [],
  templateUrl: './panel-dpgr-nacionalidad.component.html',
  styleUrl: './panel-dpgr-nacionalidad.component.css'
})
export class PanelDpgrNacionalidadComponent implements OnInit{

  constructor(private dpgrService: DpgrService) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;

    this.dpgrService.getTotalNinosMigrantes(ano, codigoRegion).subscribe({
      next: (res) => {        
        console.log('\x1b[36m%s\x1b[0m', 'holaaaaaaaaa-----------------');
        console.log('\x1b[36m%s\x1b[0m', 'getTotalNinosMigrantes')
        console.log(res)
      },
      error: (err) => {
        console.error('Error al cargar:', err);
      },
    });

    
  }

}
