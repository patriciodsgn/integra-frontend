import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemCardGrid2Component } from './elem-card-grid2.component';

describe('ElemCardGrid2Component', () => {
  let component: ElemCardGrid2Component;
  let fixture: ComponentFixture<ElemCardGrid2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemCardGrid2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemCardGrid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
