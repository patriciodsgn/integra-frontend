import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDppiAccidentesComponent } from './panel-dppi-accidentes.component';

describe('PanelDppiAccidentesComponent', () => {
  let component: PanelDppiAccidentesComponent;
  let fixture: ComponentFixture<PanelDppiAccidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDppiAccidentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDppiAccidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
