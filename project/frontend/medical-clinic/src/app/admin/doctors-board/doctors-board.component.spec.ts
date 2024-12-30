import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsBoardComponent } from './doctors-board.component';

describe('DoctorsBoardComponent', () => {
  let component: DoctorsBoardComponent;
  let fixture: ComponentFixture<DoctorsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
