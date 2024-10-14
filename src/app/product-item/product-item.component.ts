import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/Product';
import { LignePanier } from '../models/LignePanier';
import {NgStyle} from "@angular/common";
import {SharedService} from "../shared-service.service";
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
  constructor(private sharedService: SharedService) {
  }
  addToPanier() {
    const productToAdd = new LignePanier(this.product, 1);
    this.sharedService.addProductToCart(productToAdd);
  }
  getColor() {
    return this.product.stock > 0 ? 'green' : 'red';
  }
  getState() {
    return this.product.stock > 0 ? 'En stock' : 'En rupture de stock';
  }
}
