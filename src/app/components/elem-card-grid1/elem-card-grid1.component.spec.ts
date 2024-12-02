import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemCardGrid1Component } from './elem-card-grid1.component';

describe('ElemCardGrid1Component', () => {
  let component: ElemCardGrid1Component;
  let fixture: ComponentFixture<ElemCardGrid1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemCardGrid1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemCardGrid1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
