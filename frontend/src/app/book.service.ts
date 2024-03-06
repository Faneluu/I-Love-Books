import { Injectable } from '@angular/core';
import { Book } from './books';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  // bookProductList: Book[] = [
  //   {
  //     id: 1, 
  //     name: 'Crima si pedeapsa',
  //     author: 'Fyodor Dostoevsky', 
  //     imageUrl: 'https://cloud.firebrandtech.com/api/v2/img/111/9780785841739/XL',
  //     description:  'Povestea unui tanar care se intreaba cine este el cu adevarat' ,
  //     price: 50
  //   },
  //   {
  //     id: 2, 
  //     name: '1984',
  //     author: 'George Orwell', 
  //     imageUrl: 'https://www.univ.ox.ac.uk/wp-content/uploads/2018/11/1984-300x460.jpg',
  //     description:  'Distopie despre cum ar fi aratat lumea daca ar fi castigat totalitarismul' ,
  //     price: 35
  //   },
  //   {
  //     id: 3, 
  //     name: 'Crima si pedeapsa',
  //     author: 'Aldous Huxley', 
  //     imageUrl: 'https://cdn.dc5.ro/img-prod/52599-0-240.jpeg',
  //     description:  'Minunata lume noua' ,
  //     price: 35
  //   }
  // ];

  url = 'http://localhost:8080/book/all';
  
  constructor() {}

  async getAllBookProducts(): Promise<Book[]> {
    const data = await fetch(this.url);
    const books = await data.json() ?? [];
    console.log('Books: ', books);
    return await data.json() ?? [];
  }

  async getBookProductById(id: number): Promise<Book | undefined>{
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string){
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
