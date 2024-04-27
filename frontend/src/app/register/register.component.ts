import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CustomValidators } from './custom-validators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  hide = true;
  hide1 = true;
  
  email = new FormControl('', [Validators.email]);
  username = new FormControl('');
  errorEmail = '';
  
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    merge(this.email.statusChanges, this.email.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage);

  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
          ],
        ],
      },
      { validator: CustomValidators.MatchingPasswords }
    );
  }

  updateErrorMessage(){
    if (this.email.hasError('email')) {
      this.errorEmail = 'Not a valid email';
      console.log('Error message:', this.errorEmail);
    } else {
      this.errorEmail = '';
    }
  }

  submitForm() {
    const usernameValue = this.username.value ?? '';
    this.authService.usernameSubject.next(usernameValue);

    this.email.setValue('');
    this.username.setValue('');
    this.form.reset();

    this.errorEmail = ''; 
    this.hide = true; 
    this.hide1 = true;
  }
}
