import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: Observable<User>;
  userSubject!: BehaviorSubject<User>;

  constructor() { 
    this.userSubject = new BehaviorSubject<User>(null!);
    this.user = this.userSubject.asObservable();
  }
}
