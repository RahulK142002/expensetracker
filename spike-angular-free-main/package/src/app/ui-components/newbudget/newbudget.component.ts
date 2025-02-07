import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-newbudget',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule,NgFor,MatSelectModule],
  templateUrl: './newbudget.component.html',
  styleUrl: './newbudget.component.scss'
})
export class NewbudgetComponent {
  budgetForm: FormGroup;
  month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  year = ['2024', '2023', '2022','2021','2020'];

  combinedMonthYear: Array<{ month: string, year: string }> = [];
  constructor(
    
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewbudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this. budgetForm = this.fb.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      amount: ['', Validators.required],
      month: ['', Validators.required],
      
    });
    this.generateMonthYearCombinations()
  }

  generateMonthYearCombinations() {
    this.year.forEach(y => {
      this.month.forEach(m => {
        this.combinedMonthYear.push({ month: m, year: y });
      });
    });
  }

  onSave(): void {
    
    if (this. budgetForm.valid) {
      this.dialogRef.close(this. budgetForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
