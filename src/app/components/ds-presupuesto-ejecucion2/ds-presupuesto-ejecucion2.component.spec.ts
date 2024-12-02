import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPresupuestoEjecucion2Component } from './ds-presupuesto-ejecucion2.component';

describe('DsPresupuestoEjecucion2Component', () => {
  let component: DsPresupuestoEjecucion2Component;
  let fixture: ComponentFixture<DsPresupuestoEjecucion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPresupuestoEjecucion2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsPresupuestoEjecucion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
