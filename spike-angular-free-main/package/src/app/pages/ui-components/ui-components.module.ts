import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatSortModule } from '@angular/material/sort';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppIncomeComponent } from './income/income.component';
import { AppTransactionsComponent } from './transactions/transactions.component';
import { AppUpcomingIncomeComponent } from './upcomingincome/upcomingincome.component';
import { AppExpenseComponent } from './expense/expense.component';
import { AppUpcomingExpenseComponent } from './upcomingexpense/upcomingexpense.component';
import { MatNativeDateModule } from '@angular/material/core';
import { TrackbudgetsComponent } from './trackbudgets/trackbudgets.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,MatSortModule,TrackbudgetsComponent
  ],
  declarations: [
    AppIncomeComponent,
    AppTransactionsComponent,
    AppUpcomingIncomeComponent,
    AppExpenseComponent,
    AppUpcomingExpenseComponent,
    
  ],
})
export class UicomponentsModule {}
