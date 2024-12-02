import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCostosComponent } from './view-costos.component';

describe('ViewCostosComponent', () => {
  let component: ViewCostosComponent;
  let fixture: ComponentFixture<ViewCostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCostosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
