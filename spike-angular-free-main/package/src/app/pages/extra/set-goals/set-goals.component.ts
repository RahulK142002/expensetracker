import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { EditsetgoalsComponent } from 'src/app/set-goals/editsetgoals/editsetgoals.component'; 
import { DepositsetgoalsComponent } from 'src/app/set-goals/depositsetgoals/depositsetgoals.component';
import { NewsetgoalsComponent } from 'src/app/set-goals/newsetgoals/newsetgoals.component'; 
import { WebrequestService } from 'src/app/services/webrequest.service';

@Component({
  selector: 'app-sample-page',
  templateUrl: './set-goals.component.html',
  styleUrls: ['./set-goals.component.css'],
})
export class AppSetGoalsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'opening', 'target', 'remaining', 'date', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog , private webService : WebrequestService) { }

  ngOnInit(): void {
    this.webService.getGoals().subscribe((data : any[]) => {
      const updatedData = data.map(item => ({
        ...item,
        remaining: item.target - item.opening
      }));
      this.dataSource.data = updatedData;
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
    const dialogRef = this.dialog.open(EditsetgoalsComponent, {
      width: '350px',
      height:'500px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        result.remaining = this.calculateRemaining(result.opening, result.target);
        this.webService.updateGoals(element.id, result).subscribe(
          
          (response) => {
            this.webService.getGoals().subscribe((data : any[]) => {
              this.dataSource.data = data;
            })
            console.log('Income updated successfully:', response);
          },
          
        );
        // const index = this.dataSource.data.findIndex(item => item.name === element.name);
        // if (index !== -1) {
        //   this.dataSource.data[index] = result;
        //   this.dataSource = new MatTableDataSource(this.dataSource.data);
        //   this.dataSource.paginator = this.paginator;
        //   this.dataSource.sort = this.sort;
        // }
      }
    });
  }

  openDepositDialog(element: any): void {
    const dialogRef = this.dialog.open(DepositsetgoalsComponent, {
      width: '300px',
      data: { depositAmount: 0 } // Initialize with 0 or any default value
    });
  
    dialogRef.afterClosed().subscribe(depositAmount => {
      if (depositAmount !== undefined && depositAmount !== null) {
        // Ensure that depositAmount is added to the opening
        // element.opening += depositAmount;
        element.remaining -= depositAmount;
        this.webService.updateGoals(element.id, { remaining: element.remaining }).subscribe(
          (response) => {
            console.log('Remaining amount updated successfully in database:', response);
  
            // Refresh the data source to reflect the changes in the table
            this.webService.getGoals().subscribe((data: any[]) => {
              this.dataSource.data = data; // Refresh table with updated data
            });
          },
          (error) => {
            console.error('Error updating remaining amount in database:', error);
          }
        );
        
        
      
        
        // Update the remaining value
        // element.remaining = this.calculateRemaining(element.opening, element.target);
        
        // Log the values to ensure they are updated
        
  
        // Refresh the data source to trigger table update
        this.dataSource.data = [...this.dataSource.data];
        
      }
      
      else {
        console.log('Deposit amount not provided or dialog was canceled.');
      }
    });
  }
  private calculateRemaining(opening: number, target: number): number {
    return target - opening;
  }
  

  deleteElement(element: any): void {
    this.webService.deleteGoals(element).subscribe(
      (response) => {
        this.webService.getGoals().subscribe((data : any[]) => {
          this.dataSource.data = data;
        })
      }
    )
    // const index = this.dataSource.data.findIndex(item => item.name === element.name);
    // if (index !== -1) {
    //   this.dataSource.data.splice(index, 1);
    //   this.dataSource = new MatTableDataSource(this.dataSource.data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }
  }

  openNewIncomeDialog(): void {
    const dialogRef = this.dialog.open(NewsetgoalsComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.remaining = this.calculateRemaining(result.opening, result.target);
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  
  // calculateProgress(opening: number, target: number): number {
  //   return (opening / target) * 100;
  // }
}

const ELEMENT_DATA = [
  { name: 'ffsd', opening: 100, target: 200, remaining: 100, date: '01/04/24', category: 'D' },
  { name: 'dddds', opening: 200, target: 400, remaining: 200, date: '21/07/24', category: 'A' },
  { name: 'asdas', opening: 300, target: 600, remaining: 300, date: '21/03/24', category: 'B' },
  { name: 'sadsadas', opening: 400, target: 800, remaining: 400, date: '22/08/24', category: 'C' }
];