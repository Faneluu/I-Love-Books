import { Component, Input } from '@angular/core';
import { Book } from '../interfaces/books';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ShoppingService } from '../services/shopping.service';

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

  constructor(private shopService: ShoppingService){}

  addShop(){
    this.shopService.addShop(this.bookProduct);
  }
}
