import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HelpingComponent } from './helping/helping.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopBooksComponent } from './shop-books/shop-books.component';
import { BillingComponent } from './billing/billing.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { AdminComponent } from './admin/admin.component';

const routerConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'I Love Books'
  },
  {
    path: 'details/:id',
    component: BookDetailsComponent,
    title: 'Book details'
  },
  {
    path: 'contactsupport',
    component: HelpingComponent,
    title: 'Contact support'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: 'shop',
    component: ShopBooksComponent,
    title: 'Shop'
  },
  {
    path:'shop/billing',
    component: BillingComponent,
    title: 'Billing'
  },
  {
    path:'favorite',
    component: FavoriteComponent,
    title: 'Favorites'
  },
  {
    path:'admin',
    component: AdminComponent,
    title: 'Admin'
  }
];

export default routerConfig;