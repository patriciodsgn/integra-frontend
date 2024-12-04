import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPersonasMenuComponent } from './ds-personas-menu.component';

describe('DsPersonasMenuComponent', () => {
  let component: DsPersonasMenuComponent;
  let fixture: ComponentFixture<DsPersonasMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPersonasMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsPersonasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
