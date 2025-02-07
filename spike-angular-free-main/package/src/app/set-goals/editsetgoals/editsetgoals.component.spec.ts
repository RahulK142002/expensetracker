import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsetgoalsComponent } from './editsetgoals.component';

describe('EditsetgoalsComponent', () => {
  let component: EditsetgoalsComponent;
  let fixture: ComponentFixture<EditsetgoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsetgoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditsetgoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
