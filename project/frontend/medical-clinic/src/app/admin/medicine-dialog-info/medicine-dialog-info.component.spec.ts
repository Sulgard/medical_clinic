import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDialogInfoComponent } from './medicine-dialog-info.component';

describe('MedicineDialogInfoComponent', () => {
  let component: MedicineDialogInfoComponent;
  let fixture: ComponentFixture<MedicineDialogInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineDialogInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
