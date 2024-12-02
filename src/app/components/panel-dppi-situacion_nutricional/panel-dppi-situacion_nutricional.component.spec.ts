import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDppiSituacion_nutricionalComponent } from './panel-dppi-situacion_nutricional.component';

describe('PanelDppiSituacion_nutricionalComponent', () => {
  let component: PanelDppiSituacion_nutricionalComponent;
  let fixture: ComponentFixture<PanelDppiSituacion_nutricionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDppiSituacion_nutricionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDppiSituacion_nutricionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
