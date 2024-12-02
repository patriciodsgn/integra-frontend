import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDpgrComponent } from './view-dpgr.component';

describe('ViewDpgrComponent', () => {
  let component: ViewDpgrComponent;
  let fixture: ComponentFixture<ViewDpgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDpgrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDpgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
