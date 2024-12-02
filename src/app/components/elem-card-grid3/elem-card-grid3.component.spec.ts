import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemCardGrid3Component } from './elem-card-grid3.component';

describe('ElemCardGrid3Component', () => {
  let component: ElemCardGrid3Component;
  let fixture: ComponentFixture<ElemCardGrid3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemCardGrid3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemCardGrid3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
