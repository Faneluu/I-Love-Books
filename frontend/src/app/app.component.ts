import { Component, Input } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

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
  message!: string;

  constructor(private authService: AuthService){
   this.authService.username.subscribe(
    msg => this.message = msg
   );
  }

  logout(){
    this.message = '';
  }
}
