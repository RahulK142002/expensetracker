import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsetgoalsComponent } from './depositsetgoals.component';

describe('DepositsetgoalsComponent', () => {
  let component: DepositsetgoalsComponent;
  let fixture: ComponentFixture<DepositsetgoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositsetgoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositsetgoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
