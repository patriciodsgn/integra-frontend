import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDaftEjecucion_presupuestariaComponent } from './panel-daft-ejecucion_presupuestaria.component';

describe('PanelDaftEjecucion_presupuestariaComponent', () => {
  let component: PanelDaftEjecucion_presupuestariaComponent;
  let fixture: ComponentFixture<PanelDaftEjecucion_presupuestariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDaftEjecucion_presupuestariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDaftEjecucion_presupuestariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
