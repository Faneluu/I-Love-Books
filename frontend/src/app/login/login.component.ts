import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{
  hide = true;
  username = new FormControl('');
  password = new FormControl('');
  user: User = {name: '', password: '', email:''};

  constructor(private authService: AuthService) {}

  submitForm() {
    const usernameValue = this.username.value ?? '';
    const passwordValue = this.password.value ?? '';
    this.user.name = usernameValue;
    this.user.password = passwordValue;
    this.authService.userSubject.next(this.user);

    this.username.setValue('');
    this.password.setValue('');
  }
}
