import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPrescriptionListComponent } from './appointment-prescription-list.component';

describe('AppointmentPrescriptionListComponent', () => {
  let component: AppointmentPrescriptionListComponent;
  let fixture: ComponentFixture<AppointmentPrescriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentPrescriptionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentPrescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
