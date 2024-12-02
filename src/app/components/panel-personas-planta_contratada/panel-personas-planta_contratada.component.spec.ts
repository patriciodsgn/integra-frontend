import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonasPlanta_contratadaComponent } from './panel-personas-planta_contratada.component';

describe('PanelPersonasPlanta_contratadaComponent', () => {
  let component: PanelPersonasPlanta_contratadaComponent;
  let fixture: ComponentFixture<PanelPersonasPlanta_contratadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPersonasPlanta_contratadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPersonasPlanta_contratadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
