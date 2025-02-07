import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgFor } from '@angular/common';
import { WebrequestService } from 'src/app/services/webrequest.service';
@Component({
  selector: 'app-expensenewincomedialog',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule,NgFor],
  templateUrl: './expensenewincomedialog.component.html',
  styleUrl: './expensenewincomedialog.component.scss'
})
export class ExpensenewincomedialogComponent {
  expenseForm: FormGroup;
  accounts = ['Account1', 'Account2', 'Account3'];
  categories = ['Category1', 'Category2', 'Category3'];
  subcategories = ['Subcategory1', 'Subcategory2', 'Subcategory3'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpensenewincomedialogComponent>,
    private webservice: WebrequestService,  // Assuming WebserviceService is a service that handles web requests
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      reference: [''],
      date: ['', Validators.required],
      account: ['', Validators.required],
      expenseCategory: ['', Validators.required],
      expenseSubcategory: ['', Validators.required],
      note: ['']
    });
  }

  onSave(): void {
    this.webservice.createupcomingExpense(this.expenseForm.value).subscribe(res => {
      alert(" Expense added successfully")
    })
    if (this.expenseForm.valid) {
      this.dialogRef.close(this.expenseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
