import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHealthDetailsComponent } from './manage-health-details.component';

describe('ManageHealthDetailsComponent', () => {
  let component: ManageHealthDetailsComponent;
  let fixture: ComponentFixture<ManageHealthDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageHealthDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHealthDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
