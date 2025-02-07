import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { NewbudgetComponent } from 'src/app/ui-components/newbudget/newbudget.component'; 
import { EditbudgetComponent } from 'src/app/ui-components/editbudget/editbudget.component';
import { MaterialModule } from 'src/app/material.module';
import { WebrequestService } from 'src/app/services/webrequest.service';

@Component({
  selector: 'app-trackbudgets',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './trackbudgets.component.html',
  styleUrls: ['./trackbudgets.component.css'],
  
})
export class TrackbudgetsComponent implements OnInit {
    [x: string]: any;
    displayedColumns: string[] = ['category', 'subcategory','amount', 'month','action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;
  
    constructor(private dialog : MatDialog, private webService : WebrequestService) { }
  
    ngOnInit(): void {
      this.webService.getBudgets().subscribe((data : any[]) => {
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
      const dialogRef = this['dialog'].open(EditbudgetComponent, {
        width: '300px',
        data: { ...element }
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        // console.log('Dialog closed with result:', result);
        // if (result) {
        //   const index = this.dataSource.data.findIndex(item => item.category === element.category);
        //   if (index !== -1) {
        //     this.dataSource.data[index] = result;
        //     this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the table
        //     this.dataSource.paginator = this.paginator;
        //     this.dataSource.sort = this.sort;
        //   }
        // }
        if (result) {
          this.webService.updateBudgets(element.id, result).subscribe(
            
            (response) => {
              this.webService.getBudgets().subscribe((data : any[]) => {
                this.dataSource.data = data;
              })
             
            },
            
          );
        }
      });
    }
  
    deleteElement(element: any): void {
      this.webService.deleteBudgets(element).subscribe(
        (response) => {
          this.webService.getBudgets().subscribe((data : any[]) => {
            this.dataSource.data = data;
          })
        }
      )
      // const index = this.dataSource.data.findIndex(item => item.category === element.category);
      // if (index !== -1) {
      //   this.dataSource.data.splice(index, 1);
      //   this.dataSource = new MatTableDataSource(this.dataSource.data); // Refresh the table
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      // }
    }
    openNewIncomeDialog(): void {
        const dialogRef = this.dialog.open(NewbudgetComponent, {
          width: '500px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.webService.createBudgets(result).subscribe(
            (response) => {
              this.webService.getBudgets().subscribe((data : any[]) => {
                this.dataSource.data = data;
              })
            }
          )
          // if (result) {
          //   this.dataSource.data.push(result);
          //   this.dataSource = new MatTableDataSource(this.dataSource.data);
          //   this.dataSource.paginator = this.paginator;
          //   this.dataSource.sort = this.sort;
          // }
        });
      }
}
const ELEMENT_DATA = [
    { category: 'Education', subcategory: 'e1', amount: 311 ,month: 'Jan,2024'},
    { category: 'Health', subcategory: 'h2', amount: 234 , month: 'Mar,2024' },
 
  ];