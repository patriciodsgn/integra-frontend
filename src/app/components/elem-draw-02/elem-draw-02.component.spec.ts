import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemDraw02Component } from './elem-draw-02.component';

describe('ElemDraw02Component', () => {
  let component: ElemDraw02Component;
  let fixture: ComponentFixture<ElemDraw02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemDraw02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemDraw02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
