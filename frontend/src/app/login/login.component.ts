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
  isAuthenticated = false;
  firstTime = true;

  username = new FormControl('');
  password = new FormControl('');
  user: User = {id:0, name: '', password: '', email:''};

  constructor(private authService: AuthService) {}

  submitForm() {
    const usernameValue = this.username.value ?? '';
    const passwordValue = this.password.value ?? '';

    const users = this.authService.usersSubject.getValue();
    
    this.isAuthenticated = false;

    for (var i = 0; i < users.length; i++){
      if (users[i].name === usernameValue && users[i].password === passwordValue){
        this.user.name = usernameValue;
        this.user.password = passwordValue;
        this.authService.currentUserSubject.next(this.user);
        
        this.isAuthenticated = true;
        this.authService.setSessionToken(usernameValue);
        
        break;
      }
    }

    this.username.setValue('');
    this.password.setValue('');
    
    this.firstTime = false;
  }
}
