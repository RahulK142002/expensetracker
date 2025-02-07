import { Routes } from '@angular/router';


// pages
import { AppCalendarComponent } from './calendar/calendar.component';
import { AppSetGoalsComponent } from './set-goals/set-goals.component';
import { AccountComponent } from './accounts/accounts.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calendar',
        component: AppCalendarComponent,
      },
      {
        path: 'set-goals',
        component: AppSetGoalsComponent,
      },
      {
        path: 'account',
        component: AccountComponent
        
      }
    ],
  },
];
