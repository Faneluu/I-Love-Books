import { Injectable } from '@angular/core';
import { Book } from '../interfaces/books';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookObs!: Observable<Book[]>;
  bookSubject!: BehaviorSubject<Book[]>;
  bookProductList!: Book[];
  url = 'http://localhost:8080/book';

  constructor(){
    this.bookSubject = new BehaviorSubject<Book[]>(null!);
    this.bookObs = this.bookSubject.asObservable();

    this.initializeBooks();
  }

  addBook(book: Book){
    const currentBooks = this.bookSubject.getValue();
    const index = currentBooks.findIndex(index => index.name === book.name);

    if (index === -1){

      let smallestAvailableId = 1;
      const idSet = new Set(this.bookProductList.map(existingBook => existingBook.id));
      while (idSet.has(smallestAvailableId)) {
        smallestAvailableId++;
      }

      book.id = smallestAvailableId;

      currentBooks.push(book);
      this.bookSubject.next(currentBooks);

      fetch(`${this.url}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(response => {
            if (response.ok) {
                console.log('Book added successfully to the database.');
            } else {
                console.error('Failed to add book to the database.');
            }
        })
        .catch(error => {
            console.error('Error occurred while adding book:', error);
        });
    }
  }    

  private async initializeBooks(){
    try{
      this.getAllBookProducts().then((books: Book[]) =>{
        this.bookProductList = books;
        this.bookSubject.next(this.bookProductList);
      })
    } catch(error){
      console.error('Error fetching books: ', error);
    }
  }

  async getAllBookProducts(): Promise<Book[]> {
    const data = await fetch(`${this.url}/all`);
    const books = await data.json() ?? [];
    console.log('Books: ', books);
    return await books ?? [];
  }

  async getBookProductById(id: number): Promise<Book | undefined>{
    const data = await fetch(`${this.url}/find/${id}`);
    const book = await data.json() ?? [];
    return await book ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string){
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
