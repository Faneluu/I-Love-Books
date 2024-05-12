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
  usersList!: User[];


  url = 'http://localhost:8080/user';

  constructor() { 
    this.currentUserSubject = new BehaviorSubject<User>(null!);
    this.currentUserObs = this.currentUserSubject.asObservable();

    this.usersSubject = new BehaviorSubject<User[]>([]);
    this.usersObs = this.usersSubject.asObservable();
    
    this.initializeUsers();
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
      users.sort((a, b) => a.id - b.id);
      this.usersSubject.next(users);

      fetch(`${this.url}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => {
        if (response.ok) {
            console.log('User added successfully to the database.');
        } else {
            console.error('Failed to add user to the database.');
        }
      })
      .catch(error => {
          console.error('Error occurred while adding user:', error);
      });
    }
  }

  private async initializeUsers(){
    try{
      this.getAllUsers().then((users: User[]) =>{
        this.usersList = users;
        this.usersSubject.next(this.usersList);
      })
    } catch(error){
      console.error('Error fetching books: ', error);
    }
  }

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(`${this.url}/all`);
    const books = await data.json() ?? [];
    console.log('Users: ', books);
    return await books ?? [];
  }
}
