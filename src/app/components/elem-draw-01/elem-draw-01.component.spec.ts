import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemDraw01Component } from './elem-draw-01.component';

describe('ElemDraw01Component', () => {
  let component: ElemDraw01Component;
  let fixture: ComponentFixture<ElemDraw01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemDraw01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemDraw01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
