import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbudgetComponent } from './editbudget.component';

describe('EditbudgetComponent', () => {
  let component: EditbudgetComponent;
  let fixture: ComponentFixture<EditbudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
