import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDaftSaldo_por_ejecutarComponent } from './panel-daft-saldo_por_ejecutar.component';

describe('PanelDaftSaldo_por_ejecutarComponent', () => {
  let component: PanelDaftSaldo_por_ejecutarComponent;
  let fixture: ComponentFixture<PanelDaftSaldo_por_ejecutarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDaftSaldo_por_ejecutarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDaftSaldo_por_ejecutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
