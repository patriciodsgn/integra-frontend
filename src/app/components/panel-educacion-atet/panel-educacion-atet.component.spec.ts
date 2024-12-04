import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEducacionAtetComponent } from './panel-educacion-atet.component';

describe('PanelEducacionAtetComponent', () => {
  let component: PanelEducacionAtetComponent;
  let fixture: ComponentFixture<PanelEducacionAtetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelEducacionAtetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEducacionAtetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
