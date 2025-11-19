import { Component, Input } from '@angular/core';
import { Product } from '../models/Product';
import { LignePanier } from '../models/LignePanier';
import { NgStyle } from "@angular/common";
import { SharedService } from "../shared-service.service";
import { RouterLink } from "@angular/router"; // <--- IMPORT ESSENTIEL

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink // <--- AJOUT OBLIGATOIRE POUR QUE LE HTML FONCTIONNE
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;

  // Plus besoin de 'private router: Router' ici
  constructor(private sharedService: SharedService) {}

  addToPanier(event: Event) {
    event.stopPropagation(); // Empêche d'ouvrir la page produit quand on clique sur "Ajouter au panier"
    event.preventDefault();  // Sécurité supplémentaire
    
    const productToAdd = new LignePanier(this.product, 1);
    this.sharedService.addProductToCart(productToAdd);
  }

  getColor() {
    return this.product.stock > 0 ? 'green' : 'red';
  }

  getState() {
    return this.product.stock > 0 ? 'In Stock' : 'Not in Stock';
  }
  
  // La fonction onComponentClick a été supprimée car remplacée par [routerLink] dans le HTML
}