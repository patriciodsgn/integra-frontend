import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDpgrSelloVerdeComponent } from './panel-dpgr-sello-verde.component';

describe('PanelDpgrSelloVerdeComponent', () => {
  let component: PanelDpgrSelloVerdeComponent;
  let fixture: ComponentFixture<PanelDpgrSelloVerdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDpgrSelloVerdeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDpgrSelloVerdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
