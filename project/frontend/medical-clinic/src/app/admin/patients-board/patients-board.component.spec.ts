import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsBoardComponent } from './patients-board.component';

describe('PatientsBoardComponent', () => {
  let component: PatientsBoardComponent;
  let fixture: ComponentFixture<PatientsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
