import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonasAusentismoComponent } from './panel-personas-ausentismo.component';

describe('PanelPersonasAusentismoComponent', () => {
  let component: PanelPersonasAusentismoComponent;
  let fixture: ComponentFixture<PanelPersonasAusentismoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPersonasAusentismoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPersonasAusentismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
