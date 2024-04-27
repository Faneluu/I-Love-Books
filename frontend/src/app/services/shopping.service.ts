import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookShop } from '../interfaces/booksShop';
import { Book } from '../interfaces/books';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  bookObs!: Observable<BookShop[]>;
  bookSubject!: BehaviorSubject<BookShop[]>;

  constructor() { 
    this.bookSubject = new BehaviorSubject<BookShop[]>(null!);
    this.bookObs = this.bookSubject.asObservable();
  }

  addShop(book: Book){
    let currentBooks = this.bookSubject.getValue();
    
    if (!currentBooks){
      currentBooks = [];
    }

    const existingBookIndex = currentBooks?.findIndex(item => item.book.id === book.id);

    if (existingBookIndex === -1){
      currentBooks?.push({book, cantity: 1});
    }else{
      currentBooks[existingBookIndex].cantity++;
    }
    this.bookSubject.next([...currentBooks]);
  }
}
