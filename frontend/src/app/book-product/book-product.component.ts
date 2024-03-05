import { Component, Input } from '@angular/core';
import { Book } from '../books';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-product',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './book-product.component.html',
  styleUrl: './book-product.component.css'
})
export class BookProductComponent {
  @Input() bookProduct!: Book;
}
