import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersObs!: Observable<User[]>;
  usersSubject!: BehaviorSubject<User[]>;
  currentUserObs!: Observable<User>;
  currentUserSubject!: BehaviorSubject<User>;

  constructor() { 
    this.currentUserSubject = new BehaviorSubject<User>(null!);
    this.currentUserObs = this.currentUserSubject.asObservable();

    this.usersSubject = new BehaviorSubject<User[]>([]);
    this.usersObs = this.usersSubject.asObservable();
  }

  addUser(user: User){
    const users = this.usersSubject.getValue();
    const index = users.findIndex(index => index.id === user.id);

    console.log("Index addUser: " + index);

    if (index === -1){

      let smallestAvailableId = 1;
      const idSet = new Set(users.map(existingUsers => existingUsers.id));
      while (idSet.has(smallestAvailableId)) {
          smallestAvailableId++;
      }

      user.id = smallestAvailableId;
      users.push(user);
      this.usersSubject.next(users);
    }
  }
}
