import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-editbudget',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './editbudget.component.html',
  styleUrl: './editbudget.component.scss'
})
export class EditbudgetComponent {
  editbudgetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditbudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editbudgetForm = this.fb.group({
      category: [data.category, Validators.required],
      subcategory: [data.subcategory, Validators.required],
      amount: [data.amount, Validators.required],
      month: [data.month, Validators.required],
      
    });
  }

  onSave(): void {
    
    if (this.editbudgetForm.valid) {
      this.dialogRef.close(this.editbudgetForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
