import { Component, Input } from '@angular/core';
import { Book } from '../books';

@Component({
  selector: 'app-book-location',
  standalone: true,
  imports: [],
  templateUrl: './book-location.component.html',
  styleUrl: './book-location.component.css'
})
export class BookLocationComponent {
  @Input() bookLocation!: Book;
}
