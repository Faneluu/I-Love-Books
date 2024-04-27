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
  total!: number;

  constructor(private shopService: ShoppingService){
    this.books = shopService.bookSubject.getValue();
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    for (const item of this.books){
      this.total += item.book.price * item.cantity;
    }
  }

  decreaseCantity(book: BookShop){
    const index = this.books.findIndex(index => index.book.id === book.book.id);

    if (index !== -1){
      this.books[index].cantity--;
      this.total -= this.books[index].book.price;

      if (this.books[index].cantity === 0){
        this.shopService.removeShop(book);
      }
      else{
        this.shopService.bookSubject.next(this.books);
      }
    }
  }

  increaseCantity(book: BookShop){
    const index = this.books.findIndex(index => index.book.id === book.book.id);

    if (index !== -1){
      this.books[index].cantity++;
      this.total += this.books[index].book.price;
      this.shopService.bookSubject.next(this.books);
    }
  }
}
