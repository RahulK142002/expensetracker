import { Component,OnInit,ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseeditdialogComponent } from 'src/app/ui-components/expenseeditdialog/expenseeditdialog.component';
import { ExpenserecievedialogComponent } from 'src/app/ui-components/expenserecievedialog/expenserecievedialog.component';
import { ExpensenewincomedialogComponent } from 'src/app/ui-components/expensenewincomedialog/expensenewincomedialog.component';
import { WebrequestService } from 'src/app/services/webrequest.service';
@Component({
  selector: 'app-tooltips',
  templateUrl: './upcomingexpense.component.html',
  styleUrls: ['./upcomingexpense.component.css'],
})
export class AppUpcomingExpenseComponent implements OnInit {
  // //  disabled
  // disabled = new FormControl(false);

  // // show and hide
  // showDelay = new FormControl(1000);
  // hideDelay = new FormControl(2000);

  // // change message
  // message = new FormControl('Info about the action');
  [x: string]: any;
  displayedColumns: string[] = ['name', 'amount', 'date', 'account', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog : MatDialog, private webservice : WebrequestService) { }

  ngOnInit(): void {
    this.webservice.getupcomingExpense().subscribe((data : any[]) => {
      this.dataSource.data = data;
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'data_export.xlsx');
  }

  exportToCsv(): void {
    const csvData = this.convertToCsv(this.dataSource.filteredData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'data_export.csv');
  }

  printTable(): void {
    const printContents = document.getElementById('dataTable')?.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents ?? '';
    window.print();
    document.body.innerHTML = originalContents;
  }

  private convertToCsv(data: any[]): string {
    const array = [Object.keys(data[0])].concat(data);
    return array.map(it => {
      return Object.values(it).toString();
    }).join('\n');
  }
  openEditDialog(element: any): void {
    // console.log('openEditDialog called with:', element);
    const dialogRef = this['dialog'].open(ExpenseeditdialogComponent, {
      width: '300px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log('Dialog closed with result:', result);
      if (result) {
        this.webservice.updateupcomingExpense(element.id, result).subscribe(
          
          (response) => {
            this.webservice.getupcomingExpense().subscribe((data : any[]) => {
              this.dataSource.data = data;
            })
            console.log(' updated successfully:', response);
          },
          
        );
        // const index = this.dataSource.data.findIndex(item => item.name === element.name);
        // if (index !== -1) {
        //   this.dataSource.data[index] = result;
        //   this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the table
        //   this.dataSource.paginator = this.paginator;
        //   this.dataSource.sort = this.sort;
        // }
      }
    });
  }
  openReceiveDialog(element: any): void {
    const dialogRef = this.dialog.open(ExpenserecievedialogComponent, {
      width: '300px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.webservice.deleteupcomingExpense(element).subscribe(
        (response) => {
          this.webservice.getupcomingExpense().subscribe((data : any[]) => {
            this.dataSource.data = data;
          })
        }
      )
      // if (result) {
      //   const index = this.dataSource.data.findIndex(item => item.name === element.name);
      //   if (index !== -1) {
      //     this.dataSource.data.splice(index, 1); // Delete the entry
      //     this.dataSource = new MatTableDataSource(this.dataSource.data);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //   }
      // }
    });
  }

  deleteElement(element: any): void {
    this.webservice.deleteupcomingExpense(element).subscribe(
      (response) => {
        this.webservice.getupcomingExpense().subscribe((data : any[]) => {
          this.dataSource.data = data;
        })
      }
    )
    // const index = this.dataSource.data.findIndex(item => item.name === element.name);
    // if (index !== -1) {
    //   this.dataSource.data.splice(index, 1);
    //   this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the table
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }
  }
  openNewExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpensenewincomedialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
const ELEMENT_DATA = [
  
  { name: 'ffsd', amount: 115, date: '01/04/24',category: 'D' },
  { name: 'dddds', amount: 225, date: '21/07/24',category: 'A' },
  { name: 'asdas', amount: 675, date: '21/03/24',category: 'B' },
  { name: 'sadsadas', amount: 2225, date: '22/08/24',category: 'C' }
];


