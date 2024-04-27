import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../interfaces/books';
import { BookService } from '../services/book.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
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

  submitApplication(){
    
  }
}
