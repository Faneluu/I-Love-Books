import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username!: Observable<string>;
  usernameSubject!: BehaviorSubject<string>;

  constructor() { 
    this.usernameSubject = new BehaviorSubject<string>('');
    this.username = this.usernameSubject.asObservable();
  }
}
