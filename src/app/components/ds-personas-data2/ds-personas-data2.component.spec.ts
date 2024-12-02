import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPersonasData2Component } from './ds-personas-data2.component';

describe('DsPersonasData2Component', () => {
  let component: DsPersonasData2Component;
  let fixture: ComponentFixture<DsPersonasData2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPersonasData2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsPersonasData2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
