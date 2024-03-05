import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../books';
import { BookService } from '../book.service';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bookProductId = -1;
  bookProduct: Book | undefined;
  bookService = inject(BookService);

  constructor(){
    this.bookProductId = Number(this.route.snapshot.params['id']);
    this.bookProduct = this.bookService.getBookProductById(this.bookProductId);
  }

  
}
