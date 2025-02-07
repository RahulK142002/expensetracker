import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgFor } from '@angular/common';
import { WebrequestService } from '../services/webrequest.service';

@Component({
  selector: 'app-new-income-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule,NgFor],
  templateUrl: './new-income-dialog.component.html',
  styleUrl: './new-income-dialog.component.scss'
})
export class NewIncomeDialogComponent {
  incomeForm: FormGroup;
  accounts = ['Account1', 'Account2', 'Account3'];
  categories = ['Category1', 'Category2', 'Category3'];
  subcategories = ['Subcategory1', 'Subcategory2', 'Subcategory3'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewIncomeDialogComponent>,
    private webservice : WebrequestService,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.incomeForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      reference: [''],
      date: ['', Validators.required],
      account: ['', Validators.required],
      incomeCategory: ['', Validators.required],
      incomeSubcategory: ['', Validators.required],
      note: ['']
    });
  }

  onSave(): void {
    this.webservice.createupcomingIncome(this.incomeForm.value).subscribe(res => {
      alert(" Income added successfully")
    })
    if (this.incomeForm.valid) {
      this.dialogRef.close(this.incomeForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
