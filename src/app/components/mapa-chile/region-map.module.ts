// region-map.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionMapComponent } from './mapa-chile.component';

@NgModule({
  declarations: [RegionMapComponent],
  imports: [CommonModule],
  exports: [RegionMapComponent]
})
export class RegionMapModule {}