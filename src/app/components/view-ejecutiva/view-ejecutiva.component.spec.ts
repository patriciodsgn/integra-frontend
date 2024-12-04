import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEjecutivaComponent } from './view-ejecutiva.component';

describe('ViewEjecutivaComponent', () => {
  let component: ViewEjecutivaComponent;
  let fixture: ComponentFixture<ViewEjecutivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEjecutivaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEjecutivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
