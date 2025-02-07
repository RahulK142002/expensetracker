import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/ui-components/edit-dialog/edit-dialog.component';
import { WebrequestService } from 'src/app/services/webrequest.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class AppIncomeComponent implements OnInit {
  
  
  [x: string]: any;
  displayedColumns: string[] = ['name', 'amount', 'date', 'account','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private http : HttpClient,private dialog : MatDialog, private webService : WebrequestService) { }

  ngOnInit(): void {
    this.webService.getIncome().subscribe((data : any[]) => {
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
        this.webService.updateIncome(element.id, result).subscribe(
          
          (response) => {
            this.webService.getIncome().subscribe((data : any[]) => {
              this.dataSource.data = data;
            })
            console.log('Income updated successfully:', response);
          },
          
        );
       
        // const index = this.dataSource.data.findIndex(item => item.id === element.id);
        // if (index !== -1) {
        //   // this.dataSource.data[index] = result;
        //   // this.dataSource = new MatTableDataSource(this.dataSource.data); 
        //   // this.dataSource.paginator = this.paginator;
        //   // this.dataSource.sort = this.sort;
       
        // }
      }
    });
  }

  

  deleteElement(element: any): void {
    this.webService.deleteIncome(element).subscribe(
      (response) => {
        this.webService.getIncome().subscribe((data : any[]) => {
          this.dataSource.data = data;
        })
        // const index = this.dataSource.data.findIndex(item => item.id === element.id);
        // if (index !== -1) {
      
        //   this.dataSource.data.splice(index, 1);
        //   this.dataSource = new MatTableDataSource(this.dataSource.data); 
        //   this.dataSource.paginator = this.paginator;
        //   this.dataSource.sort = this.sort;
        // }
      }
      
    )
    
   
  }
  
}

const ELEMENT_DATA = [
  { name: 'John', amount: 215, date: '12/07/24', account: 'Account1' },
  { name: 'Jane', amount: 310, date: '13/02/24', account: 'Account2' },
  { name: 'Peter', amount: 315, date: '01/07/24', account: 'Account3' },
  { name: 'ffsd', amount: 115, date: '01/04/24', account: 'Account2' },
  { name: 'dddds', amount: 225, date: '21/07/24', account: 'Account2' },
  { name: 'asdas', amount: 675, date: '21/03/24', account: 'Account1' },
  { name: 'sadsadas', amount: 2225, date: '22/08/24', account: 'Account3' }
];


