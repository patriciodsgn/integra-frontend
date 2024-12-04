import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPresupuestoEjecucion1Component } from './ds-presupuesto-ejecucion1.component';

describe('DsPresupuestoEjecucion1Component', () => {
  let component: DsPresupuestoEjecucion1Component;
  let fixture: ComponentFixture<DsPresupuestoEjecucion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPresupuestoEjecucion1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsPresupuestoEjecucion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
