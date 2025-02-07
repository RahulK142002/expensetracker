import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensenewincomedialogComponent } from './expensenewincomedialog.component';

describe('ExpensenewincomedialogComponent', () => {
  let component: ExpensenewincomedialogComponent;
  let fixture: ComponentFixture<ExpensenewincomedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensenewincomedialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpensenewincomedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
