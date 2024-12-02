import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemButtonComponent } from './elem-button.component';

describe('ElemButtonComponent', () => {
  let component: ElemButtonComponent;
  let fixture: ComponentFixture<ElemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
