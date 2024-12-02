import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonasComponent } from './view-personas.component';

describe('ViewPersonasComponent', () => {
  let component: ViewPersonasComponent;
  let fixture: ComponentFixture<ViewPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPersonasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
