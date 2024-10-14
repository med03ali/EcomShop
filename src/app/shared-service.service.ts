import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {LignePanier} from "./models/LignePanier";

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Cart item count
  private cartItemCountSource = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSource.asObservable();

  // Search key
  private searchKeySource = new BehaviorSubject<string>('');
  searchKey$ = this.searchKeySource.asObservable();

  // Selected category
  private selectedCategorySource = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategorySource.asObservable();

  private cartItems = new BehaviorSubject<LignePanier[]>([]);
  cartItems$ = this.cartItems.asObservable(); // Observable to be used in the components

  // Method to add a product to the cart
  addProductToCart(product: LignePanier) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => item.produit.id === product.produit.id);

    if (existingItemIndex > -1) {
      // If product already exists in the cart, update quantity
      currentItems[existingItemIndex].quantite += 1;
    } else {
      // If it's a new product, add it to the cart
      currentItems.push(product);
    }

    this.cartItems.next(currentItems); // Update the BehaviorSubject
  }

  // Method to get all cart items
  getCartItems(): LignePanier[] {
    return this.cartItems.value;
  }

  // Update cart item count
  setCartItemCount(count: number) {
    this.cartItemCountSource.next(count);
  }

  // Update search key
  setSearchKey(key: string) {
    this.searchKeySource.next(key);
  }

  // Update selected category
  setSelectedCategory(category: string) {
    this.selectedCategorySource.next(category);
  }
}
