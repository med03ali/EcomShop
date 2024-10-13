import {Component, Input, OnInit} from '@angular/core';
import { LignePanier } from '../models/LignePanier';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css',
})
export class PanierComponent {
  @Input() items: LignePanier[] = [];

  /*
  ngOnInit(): void {
    // Load cart from localStorage if it exists
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.items = JSON.parse(storedCart);
    }
  }

  updateCartInLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
*/

  updateQuantite(index: number, newQuantite: number) {
    if (newQuantite < 1) {
      this.items[index].quantite = 1;
    } else {
      this.items[index].quantite = newQuantite;
    }
    //this.updateCartInLocalStorage();
  }

  calculateTotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.produit.price * item.quantite,
      0
    );
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    //this.updateCartInLocalStorage();
  }

  validerPanier() {
    alert('Panier validé avec succès!');
  }

  increaseQuantity(index: number) {
    this.items[index].quantite += 1;
    //this.updateCartInLocalStorage();
  }

  decreaseQuantity(index: number) {
    if (this.items[index].quantite > 1) {
      this.items[index].quantite -= 1;
      //this.updateCartInLocalStorage();
    }
  }
}
