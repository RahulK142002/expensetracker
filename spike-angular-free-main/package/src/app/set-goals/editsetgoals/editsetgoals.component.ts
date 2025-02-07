import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-editsetgoals',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,MatDialogModule],
  templateUrl: './editsetgoals.component.html',
  styleUrl: './editsetgoals.component.scss'
})
export class EditsetgoalsComponent {
  editgoalsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditsetgoalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editgoalsForm = this.fb.group({
      name: [data.name, Validators.required],
      opening: [data.opening, Validators.required],
      target: [data.target, Validators.required],
      date: [data.date, Validators.required],
      
    });
  }

  onSave(): void {
    if (this.editgoalsForm.valid) {
      this.dialogRef.close(this.editgoalsForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
