import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-expenseeditdialog',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,MatDialogModule],
  templateUrl: './expenseeditdialog.component.html',
  styleUrl: './expenseeditdialog.component.css'
})
export class ExpenseeditdialogComponent {
  editexpenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseeditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editexpenseForm = this.fb.group({
      name: [data.name, Validators.required],
      amount: [data.amount, Validators.required],
      date: [data.date, Validators.required],
      account: [data.account, Validators.required]
     
    });
  }

  onSave(): void {
    if (this.editexpenseForm.valid) {
      this.dialogRef.close(this.editexpenseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
