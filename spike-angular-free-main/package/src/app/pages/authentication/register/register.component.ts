import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';
import { AuthService } from 'src/app/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
  standalone: true,
  imports:[FormsModule,ReactiveFormsModule, NgIf],
  
})
export class AppRegisterComponent  {
 
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  // register() {
  //   const user = { username: this.username, email: this.email, password: this.password };
  //   this.authService.register(user).subscribe({
  //     next:(res: any) => {
  //       console.log('Registration successful', res);
  //       this.router.navigate(['/']);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //     complete: () => {
  //       console.log('Registration request completed');
  //     }
  //   });
  // }
  
  register() {
    const user = {
      username: this.username, 
      email: this.email, 
      password: this.password
    };
    console.log('Submitting registration form:', user);
    this.authService.register(user).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        this.authService.storeToken(res.token);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        window.alert('User already exists');
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }

  // hidden = false;

  // toggleBadgeVisibility() {
  //   this.hidden = !this.hidden;
  // }
}
