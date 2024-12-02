import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDaftEjecucionPresupuestariaComponent } from './panel-daft-ejecucion-presupuestaria.component';

describe('PanelDaftEjecucionPresupuestariaComponent', () => {
  let component: PanelDaftEjecucionPresupuestariaComponent;
  let fixture: ComponentFixture<PanelDaftEjecucionPresupuestariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDaftEjecucionPresupuestariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDaftEjecucionPresupuestariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
