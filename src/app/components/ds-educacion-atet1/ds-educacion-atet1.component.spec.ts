import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsEducacionAtet1Component } from './ds-educacion-atet1.component';

describe('DsEducacionAtet1Component', () => {
  let component: DsEducacionAtet1Component;
  let fixture: ComponentFixture<DsEducacionAtet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsEducacionAtet1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsEducacionAtet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
