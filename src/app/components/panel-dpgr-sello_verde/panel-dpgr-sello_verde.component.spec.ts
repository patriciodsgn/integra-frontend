import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDpgrSello_verdeComponent } from './panel-dpgr-sello_verde.component';

describe('PanelDpgrSello_verdeComponent', () => {
  let component: PanelDpgrSello_verdeComponent;
  let fixture: ComponentFixture<PanelDpgrSello_verdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDpgrSello_verdeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDpgrSello_verdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
