import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDpgrPueblosOriginariosComponent } from './panel-dpgr-pueblos-originarios.component';

describe('PanelDpgrPueblosOriginariosComponent', () => {
  let component: PanelDpgrPueblosOriginariosComponent;
  let fixture: ComponentFixture<PanelDpgrPueblosOriginariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDpgrPueblosOriginariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDpgrPueblosOriginariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
