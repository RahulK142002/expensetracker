import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-newsetgoals',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,],
  templateUrl: './newsetgoals.component.html',
  styleUrl: './newsetgoals.component.scss'
})
export class NewsetgoalsComponent {
  goalForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewsetgoalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.goalForm = this.fb.group({
      name: ['', Validators.required],
      opening: ['', Validators.required],
      date: ['', Validators.required],
      target: ['', Validators.required],
      
    });
  }

  onSave(): void {
    if (this.goalForm.valid) {
      this.dialogRef.close(this.goalForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
