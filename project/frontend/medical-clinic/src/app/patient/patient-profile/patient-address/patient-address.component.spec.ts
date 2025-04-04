import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddressComponent } from './patient-address.component';

describe('PatientAddressComponent', () => {
  let component: PatientAddressComponent;
  let fixture: ComponentFixture<PatientAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
