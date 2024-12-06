import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCostosEvolucionComponent } from './panel-costos-evolucion.component';

describe('PanelCostosEvolucionComponent', () => {
  let component: PanelCostosEvolucionComponent;
  let fixture: ComponentFixture<PanelCostosEvolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCostosEvolucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCostosEvolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
