import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditAddressComponent } from './patient-edit-address.component';

describe('PatientEditAddressComponent', () => {
  let component: PatientEditAddressComponent;
  let fixture: ComponentFixture<PatientEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientEditAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
