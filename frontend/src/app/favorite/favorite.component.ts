import { Component } from '@angular/core';
import { BookShop } from '../interfaces/booksShop';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  bookProducts!: BookShop[];

  constructor(private favoriteService: FavoriteService, private shopService: ShoppingService){
    this.bookProducts = favoriteService.bookSubject.getValue();
  }

  removeFavorite(book: BookShop){
    this.favoriteService.removeFavorite(book);
  }

  addShop(book: BookShop){
    this.shopService.addShop(book.book);
  }
}
