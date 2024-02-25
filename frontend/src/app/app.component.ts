import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './book';
import { BookService } from './book.service';
import { response } from 'express';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = "frontend";
  public books: Book[] = [];

  constructor(private bookServie: BookService){}

  ngOnInit(): void {
      this.getBooks();
  }

  public getBooks(): void{
    this.bookServie.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
