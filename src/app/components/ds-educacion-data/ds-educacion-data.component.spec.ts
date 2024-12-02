import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsEducacionDataComponent } from './ds-educacion-data.component';

describe('DsEducacionDataComponent', () => {
  let component: DsEducacionDataComponent;
  let fixture: ComponentFixture<DsEducacionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsEducacionDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsEducacionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
