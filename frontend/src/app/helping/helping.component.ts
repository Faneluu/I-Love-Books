import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule or ReactiveFormsModule
import { merge } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-helping',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './helping.component.html',
  styleUrl: './helping.component.css'
})
export class HelpingComponent {
  email = new FormControl('', [Validators.email]);
  text = new FormControl('');
  errorMessage = '';

  constructor(){
    merge(this.email.statusChanges, this.email.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage);
  }

  updateErrorMessage(){
    if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
      console.log('Error message:', this.errorMessage);
    } else {
      this.errorMessage = '';
    }
  }

  submitForm() {
    this.email.reset();
    this.text.reset();
  }
}
