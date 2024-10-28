import { UserService } from './../user.service';
import {Component, Input, OnInit} from '@angular/core';
import { LignePanier } from '../models/LignePanier';
import {FormsModule} from "@angular/forms";
import {SharedService} from "../shared-service.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import { User } from '../models/User';
import { NgFor} from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    FormsModule,NgFor
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css',
})
export class PanierComponent implements OnInit{
  @Input() items: LignePanier[] = [];
  constructor(private sharedService: SharedService,
              private authService: AuthService,
              private router: Router,
            private userService : UserService) {
  }

  ngOnInit(): void {
    // Subscribe to the shared service's cart items
    this.sharedService.cartItems$.subscribe(cartItems => {
      this.items = cartItems;
    });
  }

  updateQuantite(index: number, newQuantite: number) {
    if (newQuantite < 1) {
      this.items[index].quantite = 1;
    } else {
      this.items[index].quantite = newQuantite;
    }
  }

  calculateTotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.produit.price * item.quantite,
      0
    );
  }

  removeItem(index: number) {
    this.sharedService.removeProductFromCart(index);
  }

  validerPanier() {
    if (this.userService.isLoggedIn()) {
      alert('Panier validé avec succès!');
    } else {
      this.router.navigate(['/signin']);
    }
    this.sharedService.clearCart();
    
  }

  increaseQuantity(index: number) {
    this.items[index].quantite += 1;
  }

  decreaseQuantity(index: number) {
    if (this.items[index].quantite > 1) {
      this.items[index].quantite -= 1;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
