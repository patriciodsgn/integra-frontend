import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEducacionComponent } from './view-educacion.component';

describe('ViewEducacionComponent', () => {
  let component: ViewEducacionComponent;
  let fixture: ComponentFixture<ViewEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEducacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
