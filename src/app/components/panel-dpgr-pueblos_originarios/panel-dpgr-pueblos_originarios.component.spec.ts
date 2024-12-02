import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDpgrPueblos_originariosComponent } from './panel-dpgr-pueblos_originarios.component';

describe('PanelDpgrPueblos_originariosComponent', () => {
  let component: PanelDpgrPueblos_originariosComponent;
  let fixture: ComponentFixture<PanelDpgrPueblos_originariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDpgrPueblos_originariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDpgrPueblos_originariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
