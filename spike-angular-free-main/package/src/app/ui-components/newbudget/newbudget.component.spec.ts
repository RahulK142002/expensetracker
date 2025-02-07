import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbudgetComponent } from './newbudget.component';

describe('NewbudgetComponent', () => {
  let component: NewbudgetComponent;
  let fixture: ComponentFixture<NewbudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewbudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewbudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
