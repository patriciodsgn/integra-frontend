import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDppiSituacionNutricionalComponent } from './panel-dppi-situacion-nutricional.component';

describe('PanelDppiSituacionNutricionalComponent', () => {
  let component: PanelDppiSituacionNutricionalComponent;
  let fixture: ComponentFixture<PanelDppiSituacionNutricionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDppiSituacionNutricionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDppiSituacionNutricionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
