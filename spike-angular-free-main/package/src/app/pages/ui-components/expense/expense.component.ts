import { Component,OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/ui-components/edit-dialog/edit-dialog.component';
import { WebrequestService } from 'src/app/services/webrequest.service';
@Component({
  selector: 'app-menu',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class AppExpenseComponent implements OnInit {

  [x: string]: any;
  displayedColumns: string[] = ['name1', 'amount1', 'date1', 'account1','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog : MatDialog,private webService : WebrequestService ) { }

  ngOnInit(): void {
    this.webService.getExpense().subscribe((data : any[]) => {
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
    const dialogRef = this['dialog'].open(EditDialogComponent, {
      width: '300px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log('Dialog closed with result:', result);
      if (result) {
        this.webService.updateExpense(element.id, result).subscribe(
          
          (response) => {
            this.webService.getExpense().subscribe((data : any[]) => {
              this.dataSource.data = data;
            })
            console.log('Expense updated successfully:', response);
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

  deleteElement(element: any): void {
    this.webService.deleteExpense(element).subscribe(
      (response) => {
        this.webService.getExpense().subscribe((data : any[]) => {
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


}

const ELEMENT_DATA = [
  { name: 'dcdscds', amount: 2222, date: '16/07/24', account: 'Account5' },
  { name: 'Jdsdsc', amount: 333, date: '13/09/24', account: 'Account3' }
  
];
