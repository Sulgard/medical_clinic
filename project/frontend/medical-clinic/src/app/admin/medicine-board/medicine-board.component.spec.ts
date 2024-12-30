import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineBoardComponent } from './medicine-board.component';

describe('MedicineBoardComponent', () => {
  let component: MedicineBoardComponent;
  let fixture: ComponentFixture<MedicineBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
