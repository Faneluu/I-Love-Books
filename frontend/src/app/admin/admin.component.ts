import { Component, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../interfaces/books';
import {ClipboardModule} from '@angular/cdk/clipboard'
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomValidators } from '../register/custom-validators';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RegisterComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent{
  opBooks: boolean = false;
  opUsers: boolean = false;
  view: boolean = false;
  add: boolean = false;
  edit: boolean = false;
  remove: boolean = false;
  hide: boolean = false;
  hide1: boolean = false;

  bookProduct: Book = {id:0, name:'', author:'', imageUrl:'', description:'', price:0};
  booksProducts!: Book[];

  user: User = {id:0, name: '', password:'', email:''};
  users!: User[];

  errorEmail = '';
  
  username = new FormControl('');
  email = new FormControl('', [Validators.email]);
  password = new FormControl('');

  id = new FormControl('');
  name = new FormControl('');
  author = new FormControl('');
  imageUrl = new FormControl('');
  description = new FormControl('');
  price = new FormControl('');

  constructor(private bookService: BookService, private usersService: AuthService){
    this.bookService.bookObs.subscribe(
      books => this.booksProducts = books
    );

    this.usersService.usersObs.subscribe(
      users => this.users = users
    );
    
    merge(this.email.statusChanges, this.email.valueChanges).pipe(takeUntilDestroyed()).subscribe(() => this.updateErrorMessage);
  }

  updateErrorMessage(){
    if (this.email.hasError('email')) {
      this.errorEmail = 'Not a valid email';
    } else {
      this.errorEmail = '';
    }
  }

  addUser(){
    if (!this.user) {
      this.user = {id:0, name: '', password:'', email:''};
    }

    const usernameValue = this.username.value ?? '';
    const emailValue = this.email.value ?? '';
    const passwordValue = this.password.value ?? '';

    this.user.name = usernameValue;
    this.user.email = emailValue;
    this.user.password = passwordValue;

    this.usersService.addUser(this.user);

    this.email.setValue('');
    this.username.setValue('');
    this.password.setValue('');

    this.errorEmail = ''; 
    this.hide = true; 
    this.hide1 = true;
    this.user = null!;
  }

  updateUser(){
    const id_number = Number(this.id.value ?? '');
    const index = this.users.findIndex(index => index.id === id_number);

    if (index !== -1){
      if (this.username.value !== ''){
        this.users[index].name = this.username.value ?? '';
        this.username.setValue('');
      }

      if (this.email.value !== ''){
        this.users[index].email = this.email.value ?? '';
        this.email.setValue('');
      }

      if (this.password.value !== ''){
        this.users[index].password = this.password.value ?? '';
        this.password.setValue('');
      }
    }

    this.id.setValue('');
  }

  removeUser(){
    const id_number = Number(this.id.value ?? '');
    const index = this.users.findIndex(index => index.id === id_number);

    if (index !== -1){
      this.users.splice(index, 1);
    }

    this.id.setValue('');
  }

  addBook(){

    if (!this.bookProduct) {
      this.bookProduct = {id:0, name:'', author:'', imageUrl:'', description:'', price:0};
    }

    this.bookProduct.name = this.name.value ?? ''; 
    this.bookProduct.author = this.author.value ?? ''; 
    this.bookProduct.imageUrl = this.imageUrl.value ?? ''; 
    this.bookProduct.description = this.description.value ?? '';
    this.bookProduct.price = Number(this.price.value ?? '');

    this.bookService.addBook(this.bookProduct);
    this.bookProduct = null!;

    this.name.setValue('');
    this.author.setValue('');
    this.imageUrl.setValue('');
    this.description.setValue('');
    this.price.setValue('');
  }

  updateBook(){
    const id_number = Number(this.id.value ?? '');
    const index = this.booksProducts.findIndex(index => index.id === id_number);
    if (index !== -1){
      if (this.name.value !== ''){
        this.booksProducts[index].name = this.name.value ?? '';
        this.name.setValue('');
      }
      if (this.author.value !== ''){
        this.booksProducts[index].author = this.author.value ?? '';
        this.author.setValue('');
      }
      if (this.imageUrl.value !== ''){
        this.booksProducts[index].imageUrl = this.imageUrl.value ?? '';
        this.imageUrl.setValue('');
      }
      if (this.description.value !== ''){
        this.booksProducts[index].description = this.description.value ?? '';
        this.description.setValue('');
      }
      if (this.price.value !== ''){
        const price = Number(this.price.value ?? '');
        this.booksProducts[index].price = price;
        this.price.setValue('');
      }
    }

    this.id.setValue('');
  }

  removeBook(){
    const id_number = Number(this.id.value ?? '');
    const index = this.booksProducts.findIndex(index => index.id === id_number);

    if (index !== -1){
      this.booksProducts.splice(index, 1);
    }

    this.id.setValue('');
  }

  onPaste(event: ClipboardEvent) {
    const pastedValue = event.clipboardData?.getData('text');
    this.imageUrl.setValue(pastedValue!);
  }
}
