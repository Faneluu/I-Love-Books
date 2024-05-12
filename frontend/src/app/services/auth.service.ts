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

  setSessionToken(token: string): void {
    localStorage.setItem('user', token);
  }

  getSessionToken(): string | null {
    return localStorage.getItem('user');
  }

  clearSession(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getSessionToken();
  }

  addUser(user: User){
    const users = this.usersSubject.getValue();
    const index = users.findIndex(index => index.name === user.name);

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

      return false;
    }

    return true;
  }

  private async initializeUsers(){
    try{
      this.getAllUsers().then((users: User[]) =>{
        this.usersList = users;
        this.usersSubject.next(this.usersList);
        console.log("Users initialized propertly")

        if (this.isLoggedIn()){
          console.log("Este deja user-ul: " + this.getSessionToken());
          const users = this.usersSubject.getValue();
          const index = users.findIndex(index => index.name === this.getSessionToken());
          console.log("user at index: " + index);
          this.currentUserSubject.next(users[index]);
        }
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
