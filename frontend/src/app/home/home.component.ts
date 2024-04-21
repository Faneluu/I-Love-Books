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
  filteredProductList: Book[] = [];

  constructor() {
    this.bookProductList = this.bookService.getAllBookProducts();
    this.filteredProductList = this.bookProductList;
  }

  filterResults(text: string){
    if (!text){
      this.filteredProductList = this.bookProductList;
      return;
    }

    this.filteredProductList = this.bookProductList.filter( 
      bookProduct => bookProduct?.name.toLowerCase().includes(text.toLowerCase()));
  }

}
