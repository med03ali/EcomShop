import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onSubmit() {
    const isAuthenticated = this.authService.login(this.email, this.password);
    if (isAuthenticated) {
      console.log('User is authenticated.');
      this.router.navigate(['/']);
    } else {
      console.error('Login failed. Please check your credentials.');
      alert('Invalid Credentials');
    }
  }


}
