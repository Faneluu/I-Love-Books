import { Component, Input } from '@angular/core';
import { Book } from '../interfaces/books';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ShoppingService } from '../services/shopping.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-book-product',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule
  ],
  templateUrl: './book-product.component.html',
  styleUrl: './book-product.component.css'
})
export class BookProductComponent {
  @Input() bookProduct!: Book;

  constructor(private shopService: ShoppingService, private favoriteService: FavoriteService){}

  addShop(){
    this.shopService.addShop(this.bookProduct);
  }

  addFavorite(){
    this.favoriteService.addFavorite(this.bookProduct);
  }
}
