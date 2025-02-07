import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveDialogComponent } from './recieve-dialog.component';

describe('RecieveDialogComponent', () => {
  let component: RecieveDialogComponent;
  let fixture: ComponentFixture<RecieveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecieveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecieveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
