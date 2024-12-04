import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDpgrNacionalidadComponent } from './panel-dpgr-nacionalidad.component';

describe('PanelDpgrNacionalidadComponent', () => {
  let component: PanelDpgrNacionalidadComponent;
  let fixture: ComponentFixture<PanelDpgrNacionalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDpgrNacionalidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDpgrNacionalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
