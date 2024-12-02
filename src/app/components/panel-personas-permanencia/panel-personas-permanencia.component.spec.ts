import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonasPermanenciaComponent } from './panel-personas-permanencia.component';

describe('PanelPersonasPermanenciaComponent', () => {
  let component: PanelPersonasPermanenciaComponent;
  let fixture: ComponentFixture<PanelPersonasPermanenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPersonasPermanenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPersonasPermanenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
