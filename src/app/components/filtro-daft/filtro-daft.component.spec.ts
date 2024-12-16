import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDaftComponent } from './filtro-daft.component';

describe('FiltroDaftComponent', () => {
  let component: FiltroDaftComponent;
  let fixture: ComponentFixture<FiltroDaftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroDaftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroDaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
