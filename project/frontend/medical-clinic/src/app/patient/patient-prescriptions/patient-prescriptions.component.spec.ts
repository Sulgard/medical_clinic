import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPrescriptionsComponent } from './patient-prescriptions.component';

describe('PatientPrescriptionsComponent', () => {
  let component: PatientPrescriptionsComponent;
  let fixture: ComponentFixture<PatientPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientPrescriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
