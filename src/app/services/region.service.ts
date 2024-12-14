import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private selectedRegion = new BehaviorSubject<number | null>(null);
  selectedRegion$ = this.selectedRegion.asObservable();

  setRegion(regionId: number) {
    this.selectedRegion.next(regionId);
  }
}
