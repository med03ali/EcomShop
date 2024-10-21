import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common"; // Assuming you have an auth service that holds user data

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./user-profile.component.css'] // You can add styles here or use inline styles
})
export class UserProfileComponent {
  user = {
    name: '',
    email: '',
    profilePicture: ''
  };
  isEditing = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  // Method to retrieve user profile (example from AuthService)
  getUserProfile() {
    const userData = this.authService.getUser(); // This should retrieve the user data
    if (userData) {
      this.user.name = userData.name;
      this.user.email = userData.email;
      this.user.profilePicture = userData.profilePicture;
    }
  }

  // Method to toggle edit mode
  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  // Method to save profile changes
  saveProfile() {
    // Save logic, e.g., send updated data to the backend via AuthService
    this.authService.updateUser(this.user);
    this.isEditing = false;
  }

  // Method to handle file input for profile picture
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profilePicture = e.target.result; // Set the profile picture preview
      };
      reader.readAsDataURL(file);
    }
  }
}
