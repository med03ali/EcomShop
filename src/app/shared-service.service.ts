import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LignePanier } from './models/LignePanier';

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

  // Cart items BehaviorSubject
  private cartItems = new BehaviorSubject<LignePanier[]>(this.loadCartFromLocalStorage());
  cartItems$ = this.cartItems.asObservable(); // Observable to be used in the components

  constructor() {
    // Load the initial cart count from localStorage
    this.updateCartItemCount();
  }

  // Method to add a product to the cart
  addProductToCart(product: LignePanier) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => item.produit.id === product.produit.id);

    if (existingItemIndex > -1) {
      // If the product already exists in the cart, update the quantity
      currentItems[existingItemIndex].quantite += 1;
    } else {
      // If it's a new product, add it to the cart
      currentItems.push(product);
    }

    this.cartItems.next(currentItems); // Update the BehaviorSubject
    this.saveCartToLocalStorage(currentItems); // Save the updated cart to localStorage
    this.updateCartItemCount(); // Update the cart item count
  }

  removeProductFromCart(productId: number) {
    let currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.produit.id !== productId); // Remove item
  
    // Check if the updated array is different to trigger a BehaviorSubject update
    if (updatedItems.length !== currentItems.length) {
      currentItems = [...updatedItems]; // Create a new reference
      this.cartItems.next(currentItems); // Update the BehaviorSubject
      this.saveCartToLocalStorage(currentItems); // Save the updated cart to localStorage
      this.updateCartItemCount(); // Update the cart item count
    }
  }

 
  

  // Method to get all cart items
  getCartItems(): LignePanier[] {
    return this.cartItems.value;
  }

  // Update cart item count
  private updateCartItemCount() {
    const itemCount = this.cartItems.value.reduce((count, item) => count + item.quantite, 0);
    this.cartItemCountSource.next(itemCount);
  }

  // Save cart to localStorage (only if available)
  private saveCartToLocalStorage(cartItems: LignePanier[]) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }

  // Load cart from localStorage (only if available)
  private loadCartFromLocalStorage(): LignePanier[] {
    if (this.isLocalStorageAvailable()) {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return []; // Return an empty array if localStorage is not available
  }

  // Method to remove all cart items (clear the cart)
  clearCart() {
    this.cartItems.next([]);
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('cartItems');
    }
    this.updateCartItemCount(); // Reset the cart count
  }

  // Helper function to check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
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
