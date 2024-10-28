import { UserService } from './../user.service';
import { User } from './../models/User';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from '../validators';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgIf,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})


export class SignupComponent {

  signupForm: FormGroup;
  client: User | null = null ; 

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService : AuthService
  ) {
    this.signupForm = this.fb.group({
      firstname: this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastname: this.fb.control('', [
        Validators.required
      ]),
      email: this.fb.control('', [
        MyValidators.isEmail()
      ]),
      age: this.fb.control('',[
        Validators.required,
        Validators.min(18)
      ]),
      phonenumber: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      repassword: this.fb.control('', [
        Validators.required
      ])
    }, {
      validators: MyValidators.matchPassword('password', 'repassword') // Use the custom matcher here
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      // Destructure form values to create a new User instance
      const { firstname, lastname, email, age, password } = this.signupForm.value;
  
      // Create a new User instance and assign it to the client property
      this.client = new User(firstname, lastname, age, password, email);
  
      // Log a confirmation message with details of the created User instance
      console.log('User client created successfully:', this.client);
      console.log('Client Name:', this.client.name);
      console.log('Client Email:', this.client.email);
      this.userService.setUser(this.client);
      this.authService.stockUser(this.client);
      console.log(localStorage);
      this.router.navigate(['/signin'])
    } else {
      console.log('Form is invalid. User client was not created.');
    }
  }


  


}
