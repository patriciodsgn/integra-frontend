import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDaftComponent } from './view-daft.component';

describe('ViewDaftComponent', () => {
  let component: ViewDaftComponent;
  let fixture: ComponentFixture<ViewDaftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDaftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
