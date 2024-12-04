import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsEducacionAtet2Component } from './ds-educacion-atet2.component';

describe('DsEducacionAtet2Component', () => {
  let component: DsEducacionAtet2Component;
  let fixture: ComponentFixture<DsEducacionAtet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsEducacionAtet2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsEducacionAtet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
