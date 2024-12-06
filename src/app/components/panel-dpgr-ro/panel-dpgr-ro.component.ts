import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DpgrService } from '../../services/dpgr.services';

@Component({
  selector: 'app-panel-dpgr-ro',
  standalone: true,
  imports: [],
  templateUrl: './panel-dpgr-ro.component.html',
  styleUrl: './panel-dpgr-ro.component.css'
})
export class PanelDpgrRoComponent implements OnInit{

  constructor(private dpgrService: DpgrService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const ano = 2023;
    const codigoRegion = 0;


    // chart 2
    this.dpgrService.getGraficoSelloVerde(ano, codigoRegion).subscribe({
      next: (res) => {        
        console.log('\x1b[36m%s\x1b[0m', '----------------- ok')
        console.log(res)
      },
      error: (err) => {
        console.error('Error al cargar:', err);
      },
    });


    // // chart 4
    // this.dpgrService.getConteoJardinesIntegra(codigoRegion).subscribe({
    //   next: (res) => {        
    //     console.log('\x1b[36m%s\x1b[0m', '----------------- getConteoJardinesIntegra')
    //     console.log(res)
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar:', err);
    //   },
    // });



  }
}
