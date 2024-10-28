import { UserService } from './../user.service';
import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { User } from '../models/User';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    FormsModule,ReactiveFormsModule,RouterLink, RouterOutlet
  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  client: User | null = null ; 

  constructor(private authService: AuthService,
              private router: Router,
              private userService : UserService
            ) {
  }

  showLo(){
    this.userService.showLocal();
  }

  


  onSubmit() {

    const isOkay = this.userService.validateCredentials(this.email,this.password);
    //const isAuthenticated = this.authService.login(this.email, this.password);
    if (isOkay) {
      console.log('User is authenticated.');
      this.router.navigate(['/']);
    } else {
      console.error('Login failed. Please check your credentials.');
      alert('Invalid Credentials');
    }
    /*if (isAuthenticated) {
      console.log('User is authenticated.');
      this.router.navigate(['/']);
    } else {
      console.error('Login failed. Please check your credentials.');
      alert('Invalid Credentials');
    }*/
  
  }


}
