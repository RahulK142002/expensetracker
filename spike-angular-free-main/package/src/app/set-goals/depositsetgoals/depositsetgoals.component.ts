import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-depositsetgoals',
  standalone: true,
  imports: [MaterialModule,FormsModule],
  templateUrl: './depositsetgoals.component.html',
  styleUrl: './depositsetgoals.component.scss'
})
export class DepositsetgoalsComponent {
  depositAmount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DepositsetgoalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  onSave(): void {
    
    this.dialogRef.close(this.data.depositAmount);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
