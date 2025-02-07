import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recieve-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,MatOption,MatFormField,MatDialogModule,MaterialModule,MatSelectModule,NgFor],
  templateUrl: './recieve-dialog.component.html',
  styleUrl: './recieve-dialog.component.scss'
})
export class RecieveDialogComponent {
  receiveForm: FormGroup;
  accounts = ['Account1', 'Account2', 'Account3'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RecieveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.receiveForm = this.fb.group({
      account: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.receiveForm.valid) {
      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
