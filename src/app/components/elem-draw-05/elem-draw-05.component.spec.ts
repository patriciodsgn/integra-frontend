import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemDraw05Component } from './elem-draw-05.component';

describe('ElemDraw05Component', () => {
  let component: ElemDraw05Component;
  let fixture: ComponentFixture<ElemDraw05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemDraw05Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemDraw05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
