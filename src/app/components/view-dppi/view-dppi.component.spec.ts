import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDppiComponent } from './view-dppi.component';

describe('ViewDppiComponent', () => {
  let component: ViewDppiComponent;
  let fixture: ComponentFixture<ViewDppiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDppiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDppiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
