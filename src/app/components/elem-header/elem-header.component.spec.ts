import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemHeaderComponent } from './elem-header.component';

describe('ElemHeaderComponent', () => {
  let component: ElemHeaderComponent;
  let fixture: ComponentFixture<ElemHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
