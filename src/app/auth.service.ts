import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuth.asObservable();

  constructor() { }

  login() {
    this.isAuth.next(true); // Simulate login
  }

  logout() {
    this.isAuth.next(false); // Simulate logout
  }
}
