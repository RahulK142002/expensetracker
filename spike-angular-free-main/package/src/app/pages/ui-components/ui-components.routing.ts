import { Routes } from '@angular/router';

// ui
import { AppIncomeComponent } from './income/income.component';
import { AppTransactionsComponent } from './transactions/transactions.component';
import { AppUpcomingIncomeComponent } from './upcomingincome/upcomingincome.component';
import { AppExpenseComponent } from './expense/expense.component';
import { AppUpcomingExpenseComponent } from './upcomingexpense/upcomingexpense.component';
import { TrackbudgetsComponent } from './trackbudgets/trackbudgets.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'income',
        component: AppIncomeComponent,
      },
      {
        path: 'transactions',
        component: AppTransactionsComponent,
      },
      {
        path: 'upcomingincome',
        component: AppUpcomingIncomeComponent,
      },
      {
        path: 'expense',
        component: AppExpenseComponent,
      },
      {
        path: 'upcomingexp',
        component: AppUpcomingExpenseComponent,
      },
      {
        path:'trackbudgets',
        component: TrackbudgetsComponent,  
      }
    ],
  },
];
