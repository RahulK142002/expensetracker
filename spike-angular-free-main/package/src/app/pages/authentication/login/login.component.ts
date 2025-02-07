import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class AppSideLoginComponent  {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.authService.storeToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        window.alert('Invalid email or password');
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }
  
}
