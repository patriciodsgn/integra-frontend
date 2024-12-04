import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemDraw04Component } from './elem-draw-04.component';

describe('ElemDraw04Component', () => {
  let component: ElemDraw04Component;
  let fixture: ComponentFixture<ElemDraw04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemDraw04Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemDraw04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
