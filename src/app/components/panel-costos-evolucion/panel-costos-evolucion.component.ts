import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CostoService } from '../../services/costo.service';



@Component({
  selector: 'app-panel-costos-evolucion',
  standalone: true,
  imports: [],
  templateUrl: './panel-costos-evolucion.component.html',
  styleUrl: './panel-costos-evolucion.component.css'
})
export class PanelCostosEvolucionComponent implements OnInit{

    constructor(private costoService: CostoService) {}
  
    ngOnInit(): void {
      this.loadData();
    }
  
    private loadData(): void {
      const ano = 2024;
      const codigoRegion = 0;
  
  
      this.costoService.getCostEvolution(ano).subscribe({
        next: (res) => {        
          console.log('\x1b[36m%s\x1b[0m', '---------------');
          console.log('\x1b[36m%s\x1b[0m', 'getCostEvolution')
          console.log(res)
        },
        error: (err) => {
          console.error('Error al cargar: getCostEvolution', err);
        },
      });
    }  
}
