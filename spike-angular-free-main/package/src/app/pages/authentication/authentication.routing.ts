import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppRegisterComponent } from './register/register.component';

export const AuthenticationRoutes: Routes = [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppRegisterComponent,
      },
    
  
];
