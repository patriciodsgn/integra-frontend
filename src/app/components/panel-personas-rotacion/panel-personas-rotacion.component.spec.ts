import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonasRotacionComponent } from './panel-personas-rotacion.component';

describe('PanelPersonasRotacionComponent', () => {
  let component: PanelPersonasRotacionComponent;
  let fixture: ComponentFixture<PanelPersonasRotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPersonasRotacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPersonasRotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
