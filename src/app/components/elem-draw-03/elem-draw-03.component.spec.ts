import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemDraw03Component } from './elem-draw-03.component';

describe('ElemDraw03Component', () => {
  let component: ElemDraw03Component;
  let fixture: ComponentFixture<ElemDraw03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemDraw03Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemDraw03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
