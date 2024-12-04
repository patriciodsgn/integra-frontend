import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';

@Component({
  selector: 'app-panel-dpgr-pueblos_originarios',
  standalone: true,
  imports: [],
  templateUrl: './panel-dpgr-pueblos_originarios.component.html',
  styleUrl: './panel-dpgr-pueblos_originarios.component.css'
})
export class PanelDpgrPueblos_originariosComponent implements OnInit{

  constructor(private dpgrService: DpgrService) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;




    this.dpgrService.getFrecuenciaPueblosOriginarios(ano, codigoRegion).subscribe({
      next: (res) => {        
        console.log('\x1b[36m%s\x1b[0m', '----------------- getFrecuenciaPueblosOriginarios')
        console.log(res)
      },
      error: (err) => {
        console.error('Error al cargar:', err);
      },
    });

    this.dpgrService.getTotalNinosOriginarios(ano, codigoRegion).subscribe({
      next: (res) => {        
        console.log('\x1b[36m%s\x1b[0m', '----------------- getTotalNinosOriginarios')
        console.log(res)
      },
      error: (err) => {
        console.error('Error al cargar:', err);
      },
    });

    this.dpgrService.getTotalNinosOriginariosIntegra(ano, codigoRegion).subscribe({
      next: (res) => {        
        console.log('\x1b[36m%s\x1b[0m', '----------------- getTotalNinosOriginariosIntegra')
        console.log(res)
      },
      error: (err) => {
        console.error('Error al cargar:', err);
      },
    });


  }
}



