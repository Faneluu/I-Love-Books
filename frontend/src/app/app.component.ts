import { Component} from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { ShoppingService } from './services/shopping.service';
import { BookShop } from './interfaces/booksShop';
import { FavoriteService } from './services/favorite.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterModule,
    MaterialModule,
    LoginComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  username!: string;
  countBooks = 0;
  countFavorites = 0;

  constructor(private authService: AuthService, private shopService: ShoppingService, private favoriteService: FavoriteService){
    this.authService.username.subscribe(
      user => this.username = user
    );

    this.shopService.bookObs.subscribe((books: BookShop[]) => {
      this.countBooks = books?.reduce((total, book) => total + book.cantity, 0);
    });

    this.favoriteService.bookObs.subscribe((books: BookShop[]) => {
      this.countFavorites = books?.reduce((total, book) => total + book.cantity, 0);
    });
  }

  logout(){
    this.username = '';
  }
}
