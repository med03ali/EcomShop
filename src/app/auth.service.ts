import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuth.asObservable();

  private defaultUser = {
    name: 'OUHASSOU Mohamed Ali',
    email: 'medali24122003@gmail.com',
    password: 'SuperAli199',
    profilePicture: 'assets/default-profile.png'
  };

  private userSubject = new BehaviorSubject<any>(this.defaultUser);
  user$ = this.userSubject.asObservable();

  constructor() {
    // Check if localStorage is available (only in browser environment)
    if (this.isBrowser()) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser)); // Set the userSubject to stored user
      }

      const storedAuthState = localStorage.getItem('isAuth');
      if (storedAuthState) {
        this.isAuth.next(JSON.parse(storedAuthState)); // Restore authentication state
      }
    }
  }
  isLoggedIn() {
    return this.isAuth.value;
  }

  // Login method
  login(email: string, password: string): boolean {
    if (email === this.defaultUser.email && password === this.defaultUser.password) {
      this.isAuth.next(true);
      if (this.isBrowser()) {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', JSON.stringify(this.defaultUser)); // Store user data in localStorage
      }
      console.log('Login successful!');
      return true; // Login successful
    } else {
      console.error('Invalid credentials!');
      return false; // Login failed
    }
  }

  // Logout method
  logout() {
    this.isAuth.next(false);
    if (this.isBrowser()) {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
    }
    this.userSubject.next(this.defaultUser);
  }

  // Get user data
  getUser() {
    return this.userSubject.value;
  }

  // Update user profile
  updateUser(updatedUser: any) {
    this.userSubject.next(updatedUser);
    if (this.isBrowser()) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }

  // Utility method to check if we're in a browser environment
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
