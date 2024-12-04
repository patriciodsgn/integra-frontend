import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEducacionNeeComponent } from './panel-educacion-nee.component';

describe('PanelEducacionNeeComponent', () => {
  let component: PanelEducacionNeeComponent;
  let fixture: ComponentFixture<PanelEducacionNeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelEducacionNeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEducacionNeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
