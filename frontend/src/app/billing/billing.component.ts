import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingService } from '../services/shopping.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
    thirdCtrl1: ['', Validators.required],
    thirdCtrl2: ['', Validators.required],
    thirdCtrl3: ['', Validators.required],
  });
  isLinear = false;
  isLogged = false;
  total!: number;
  user!: User;
  username = "User";

  constructor(private shopService: ShoppingService, private _formBuilder: FormBuilder, private authService: AuthService){
    this.calculateTotal();
    
    this.authService.currentUserSubject.subscribe(
      user => this.user = user
    )
    
    if (this.authService.isLoggedIn())
      this.isLogged = true;
  }

  calculateTotal(){
    this.total = 0;
    for (const item of this.shopService.bookSubject.getValue()){
      this.total += item.book.price * item.cantity;
    }
  }
}
