import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDaftSaldoPorEjecutarComponent } from './panel-daft-saldo-por-ejecutar.component';

describe('PanelDaftSaldoPorEjecutarComponent', () => {
  let component: PanelDaftSaldoPorEjecutarComponent;
  let fixture: ComponentFixture<PanelDaftSaldoPorEjecutarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDaftSaldoPorEjecutarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDaftSaldoPorEjecutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
