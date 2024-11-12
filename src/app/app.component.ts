import { getFirestore,collection, getDocs } from '@angular/fire/firestore';
import { environment } from './environment';
import { Component } from '@angular/core';
import {RouterOutlet, Routes} from '@angular/router';
import { ListProduitsComponent } from "./list-produits/list-produits.component";
import { NavbarComponent } from "./navbar/navbar.component";
import {PanierComponent} from "./panier/panier.component";
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { FirebaseAppModule, initializeApp } from '@angular/fire/app';

// TODO: Replace the following with your app's Firebase project configuration


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListProduitsComponent, NavbarComponent,ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecom-app';
  cartItemCount: number = 0;
  constructor() {
  }

  // Handle search text emitted by NavbarComponent
  onSearchedText(searchKey: string) {
    console.log('Search for:', searchKey);
    // Add logic here to filter products based on searchKey
  }

  // Handle category selection emitted by NavbarComponent
  onCategorySelected(category: string) {
    console.log('Category selected:', category);
    // Add logic here to filter products based on the selected category
  }

  // This method should be updated whenever items in the cart change
  updateCartItemCount(count: number) {
    this.cartItemCount = count;
  }





}
