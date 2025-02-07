import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenserecievedialogComponent } from './expenserecievedialog.component';

describe('ExpenserecievedialogComponent', () => {
  let component: ExpenserecievedialogComponent;
  let fixture: ComponentFixture<ExpenserecievedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenserecievedialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenserecievedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
