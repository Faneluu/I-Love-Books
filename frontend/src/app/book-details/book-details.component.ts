import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../books';
import { BookService } from '../book.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bookProductId = -1;
  bookProduct: Book | undefined;
  bookService = inject(BookService);
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(){
    const bookProductId = parseInt(this.route.snapshot.params['id'], 10);
    
    this.bookService.getBookProductById(bookProductId).then(
      bookProduct =>
      {
        this.bookProduct = bookProduct;
    })
  }

  submitApplication(){
    this.bookService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
