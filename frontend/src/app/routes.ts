import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HelpingComponent } from './helping/helping.component';

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
    path: 'help',
    component: HelpingComponent,
    title: 'Help'
  }
];

export default routerConfig;