import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemBar1Component } from './elem-bar1.component';

describe('ElemBar1Component', () => {
  let component: ElemBar1Component;
  let fixture: ComponentFixture<ElemBar1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemBar1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemBar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
