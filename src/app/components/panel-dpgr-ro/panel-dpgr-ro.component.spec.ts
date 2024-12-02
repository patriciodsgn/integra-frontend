import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDpgrRoComponent } from './panel-dpgr-ro.component';

describe('PanelDpgrRoComponent', () => {
  let component: PanelDpgrRoComponent;
  let fixture: ComponentFixture<PanelDpgrRoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDpgrRoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDpgrRoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
