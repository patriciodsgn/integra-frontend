import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPersonasData1Component } from './ds-personas-data1.component';

describe('DsPersonasData1Component', () => {
  let component: DsPersonasData1Component;
  let fixture: ComponentFixture<DsPersonasData1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPersonasData1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsPersonasData1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
