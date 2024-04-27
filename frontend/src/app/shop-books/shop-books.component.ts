import { Component } from '@angular/core';
import { BookShop } from '../interfaces/booksShop';
import { ShoppingService } from '../services/shopping.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop-books',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  templateUrl: './shop-books.component.html',
  styleUrl: './shop-books.component.css'
})
export class ShopBooksComponent {
  books!: BookShop[];

  constructor(private shopService: ShoppingService){
    this.books = shopService.bookSubject.getValue();
  }


}
