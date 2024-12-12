import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEducacionFamiliaComponent } from './panel-educacion-familia.component';

describe('PanelEducacionFamiliaComponent', () => {
  let component: PanelEducacionFamiliaComponent;
  let fixture: ComponentFixture<PanelEducacionFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelEducacionFamiliaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEducacionFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
