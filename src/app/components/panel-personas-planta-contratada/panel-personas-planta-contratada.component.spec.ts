import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonasPlantaContratadaComponent } from './panel-personas-planta-contratada.component';

describe('PanelPersonasPlantaContratadaComponent', () => {
  let component: PanelPersonasPlantaContratadaComponent;
  let fixture: ComponentFixture<PanelPersonasPlantaContratadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPersonasPlantaContratadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPersonasPlantaContratadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
