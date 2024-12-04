import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemNote1Component } from './elem-note1.component';

describe('ElemNote1Component', () => {
  let component: ElemNote1Component;
  let fixture: ComponentFixture<ElemNote1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemNote1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemNote1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
