import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{
  hide = true;
  username = new FormControl('');
  password = new FormControl('');

  constructor() {}

  submitForm() {
    this.username.setValue('');
    this.password.setValue('');
  }
}
