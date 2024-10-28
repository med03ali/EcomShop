import { Injectable } from '@angular/core';
import { User } from './models/User';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // Primary user representation
  client: User = { name: '', lastname: '', email: '', age: 0, password: '', profilePicture: '' };
  
  private isSignedIn = new BehaviorSubject<boolean>(false);
  isSignedIn$ = this.isSignedIn.asObservable();

  constructor(private authService: AuthService) {
    this.loadAuthState(); // Load authentication state on initialization
  }

  private loadAuthState(): void {
    if (this.isBrowser()) { // Check if we are in a browser
      const storedAuthState = localStorage.getItem('isAuth');
      if (storedAuthState && JSON.parse(storedAuthState) === true) {
        this.isSignedIn.next(true); // Restore signed-in state
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.client = JSON.parse(storedUser); // Restore client info
        }
      }
    }
  }

  showLocal() {
    console.log(this.client); // Debugging: show current client in console
  }

  setUser(user: User): void {
    this.client = user; // Update client with new user info
    if (this.isBrowser()) {
      localStorage.setItem('user', JSON.stringify(user)); // Save user info to localStorage
    }
  }

  getUser(): User {
    return this.client; // Return current user
  }

  validateCredentials(email: string, password: string): boolean {
    // Check if the client exists and validate credentials
    if (this.client.email === email && this.client.password === password) {
      this.isSignedIn.next(true); // Update authentication state
      if (this.isBrowser()) {
        localStorage.setItem('isAuth', 'true'); // Set isAuth to true in localStorage
        localStorage.setItem('user', JSON.stringify(this.client)); // Save client info
      }
      console.log('Login successful!');
      return true; // Login successful
    } else {
      console.error('Invalid credentials!');
      return false; // Return false if credentials are invalid
    }
  }

  logout() {
    this.isSignedIn.next(false); // Update authentication state
    if (this.isBrowser()) {
      localStorage.removeItem('isAuth'); // Remove auth state from localStorage
      localStorage.removeItem('user'); // Optionally clear user info
    }
    // Reset client info
    this.client = { name: '', lastname: '', email: '', age: 0, password: '', profilePicture: '' }; 
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'; // Check if running in a browser
  }

  isLoggedIn() {
    return this.isSignedIn.value;
  }
}


