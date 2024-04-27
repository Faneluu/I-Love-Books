import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
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
  total!: number;

  constructor(private shopService: ShoppingService, private _formBuilder: FormBuilder){
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    for (const item of this.shopService.bookSubject.getValue()){
      this.total += item.book.price * item.cantity;
    }
  }
}
