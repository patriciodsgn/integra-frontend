import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPresupuestoDaftComponent } from './ds-presupuesto-daft.component';

describe('DsPresupuestoDaftComponent', () => {
  let component: DsPresupuestoDaftComponent;
  let fixture: ComponentFixture<DsPresupuestoDaftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPresupuestoDaftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsPresupuestoDaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
