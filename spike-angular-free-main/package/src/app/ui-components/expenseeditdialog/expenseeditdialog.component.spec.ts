import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseeditdialogComponent } from './expenseeditdialog.component';

describe('ExpenseeditdialogComponent', () => {
  let component: ExpenseeditdialogComponent;
  let fixture: ComponentFixture<ExpenseeditdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseeditdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseeditdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
