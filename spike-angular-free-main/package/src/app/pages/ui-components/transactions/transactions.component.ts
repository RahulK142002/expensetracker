// import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebrequestService } from 'src/app/services/webrequest.service';
// import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
// import {ThemePalette} from '@angular/material/core';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// export interface ChipColor {
//   name: string;
//   color: ThemePalette;
// }

// export interface Fruit {
//   name: string;
// }

// export interface Vegetable {
//   name: string;
// }

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class AppTransactionsComponent implements OnInit {

  incomeForm!: FormGroup;
  expenseForm!: FormGroup;
  
selectedValue: any;
accounts = [
  {value: 'Account-1', viewValue: 'Account-1'},
  {value: 'Account-2', viewValue: 'Account-2'},
  {value: 'Account-3', viewValue: 'Account-3'},
];
account1 = [
  {value: 'Account-1', viewValue: 'Account-1'},
  {value: 'Account-2', viewValue: 'Account-2'},
  {value: 'Account-3', viewValue: 'Account-3'},
];
  dataSource: any;
  

  constructor(private fb: FormBuilder, private webService : WebrequestService) { }

  ngOnInit(): void {
   
    this.incomeForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      reference: [''],
      date: ['', Validators.required],
      account: ['', Validators.required],
      incomeCategory: ['', Validators.required],
      incomeSubCategory: ['', Validators.required],
      note: [''],
      file: [null]
    });
   
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      reference: [''],
      date: ['', Validators.required],
      account: ['', Validators.required],
      expenseCategory: ['', Validators.required],
      expenseSubCategory: ['', Validators.required],
      note: ['']
    });
  }
 

 
  onSubmit(): void {
    
    this.webService.createIncome(this.incomeForm.value).subscribe(res => {
      alert(" Income added successfully")
    })
    if (this.incomeForm.valid) {
      console.log(this.incomeForm.value);
    }
    
    
  }

  expSubmit(): void{
    this.webService.createExpense(this.expenseForm.value).subscribe(res => {
      alert(" Expense added successfully")
    })

    if (this.expenseForm.valid) {
      console.log(this.expenseForm.value);
    }
  }
  // drag n drop
  // vegetables: Vegetable[] = [
  //   { name: 'apple' },
  //   { name: 'banana' },
  //   { name: 'strawberry' },
  //   { name: 'orange' },
  //   { name: 'kiwi' },
  //   { name: 'cherry' },
  // ];

    // 
    // Stacked
    // 
    // availableColors: ChipColor[] = [
    //   {name: 'Primary', color: 'primary'},
    //   {name: 'Accent', color: 'accent'},
    //   {name: 'Warn', color: 'warn'},
    // ];


  // drop(event: Event) {
  //   if (isDragDrop(event)) {
  //     moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  //   }
  // }

  // 
  //  chips with input
  // 
  // addOnBlur = true;
  // readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // fruits: Fruit[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.fruits.push({ name: value });
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();
  // }

  // remove(fruit: Fruit): void {
  //   const index = this.fruits.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);
  //   }
  // }

  // edit(fruit: Fruit, event: MatChipEditedEvent) {
  //   const value = event.value.trim();

  //   // Remove fruit if it no longer has a name
  //   if (!value) {
  //     this.remove(fruit);
  //     return;
  //   }

    // Edit existing fruit
  //   const index = this.fruits.indexOf(fruit);
  //   if (index >= 0) {
  //     this.fruits[index].name = value;
  //   }

  
  // }
// }
// function isDragDrop(object: any): object is CdkDragDrop<string[]> {
//   return 'previousIndex' in object;
}
