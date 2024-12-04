import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemTitleComponent } from './elem-title.component';

describe('ElemTitleComponent', () => {
  let component: ElemTitleComponent;
  let fixture: ComponentFixture<ElemTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElemTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElemTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
