import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsEducacionNeeComponent } from './ds-educacion-nee.component';

describe('DsEducacionNeeComponent', () => {
  let component: DsEducacionNeeComponent;
  let fixture: ComponentFixture<DsEducacionNeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsEducacionNeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsEducacionNeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
