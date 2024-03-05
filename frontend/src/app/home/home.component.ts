import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookProductComponent } from '../book-product/book-product.component';
import { BookService } from '../book.service';
import { Book } from '../books';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BookProductComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  bookProductList: Book[] = [];
  bookService: BookService = inject(BookService);

  constructor() {
    this.bookProductList = this.bookService.getAllBookProducts();
  }

}
