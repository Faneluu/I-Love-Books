import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) {}

  submitForm() {
    const usernameValue = this.username.value ?? '';
    console.log("Send: " + usernameValue);
    // this.loginMessage.emit(usernameValue);
    this.authService.usernameSubject.next(usernameValue);

    this.username.setValue('');
    this.password.setValue('');
  }
}
