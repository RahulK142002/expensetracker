import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsetgoalsComponent } from './newsetgoals.component';

describe('NewsetgoalsComponent', () => {
  let component: NewsetgoalsComponent;
  let fixture: ComponentFixture<NewsetgoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsetgoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsetgoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
