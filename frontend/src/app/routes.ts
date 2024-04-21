import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HelpingComponent } from './helping/helping.component';
import { LoginComponent } from './login/login.component';

const routerConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
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
  }
];

export default routerConfig;