import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from 'src/app/ui-components/edit-dialog/edit-dialog.component';
import { RecieveDialogComponent } from 'src/app/ui-components/recieve-dialog/recieve-dialog.component'; 
import { NewIncomeDialogComponent } from 'src/app/new-income-dialog/new-income-dialog.component';
@Component({
  selector: 'app-account',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountComponent implements OnInit {
    [x: string]: any;
    displayedColumns: string[] = ['id','name', 'amount', 'date', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;
  
    constructor(private dialog : MatDialog) { }
  
    ngOnInit(): void {
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
        width: '500px',
        data: { ...element }
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        // console.log('Dialog closed with result:', result);
        if (result) {
          const index = this.dataSource.data.findIndex(item => item.name === element.name);
          if (index !== -1) {
            this.dataSource.data[index] = result;
            this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the table
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      });
    }
    openReceiveDialog(element: any): void {
      const dialogRef = this.dialog.open(RecieveDialogComponent, {
        width: '300px',
        data: { ...element }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.dataSource.data.findIndex(item => item.name === element.name);
          if (index !== -1) {
            this.dataSource.data.splice(index, 1); // Delete the entry
            this.dataSource = new MatTableDataSource(this.dataSource.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      });
    }
  
    deleteElement(element: any): void {
      const index = this.dataSource.data.findIndex(item => item.name === element.name);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the table
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
    openNewIncomeDialog(): void {
      const dialogRef = this.dialog.open(NewIncomeDialogComponent, {
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
  
    {id:1, name: 'ffsd', amount: 115, date: '01/04/24',category: 'D' },
    { id:4, name: 'dddds', amount: 225, date: '21/07/24',category: 'A' },
    {id:3, name: 'asdas', amount: 675, date: '21/03/24',category: 'B' },
    {id:2, name: 'sadsadas', amount: 2225, date: '22/08/24',category: 'C' }
  ];
