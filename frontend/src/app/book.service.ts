import { Injectable } from '@angular/core';
import { Book } from './books';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookProductList: Book[] = [
    {
      id: 1, 
      name: 'Crima si pedeapsa',
      author: 'Fyodor Dostoevsky', 
      imageUrl: 'https://i.thenile.io/r1000/9780486415871.jpg',
      description:  'Povestea unui tanar care se intreaba cine este el cu adevarat' ,
      price: 50
    },
    {
      id: 2, 
      name: '1984',
      author: 'George Orwell', 
      imageUrl: 'https://www.univ.ox.ac.uk/wp-content/uploads/2018/11/1984-300x460.jpg',
      description:  'Distopie despre cum ar fi aratat lumea daca ar fi castigat totalitarismul' ,
      price: 35
    },
    {
      id: 3, 
      name: 'Minunata lume noua',
      author: 'Aldous Huxley', 
      imageUrl: 'https://cdn.dc5.ro/img-prod/52599-0-240.jpeg',
      description:  'Minunata lume noua' ,
      price: 40
    }
  ];

  getAllBookProducts(): Book[] {
    return this.bookProductList;
  }

  getBookProductById(id: number): Book | undefined{
    return this.bookProductList.find(bookProduct => bookProduct.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string){
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
