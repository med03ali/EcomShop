import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/Product';
import { LignePanier } from '../models/LignePanier';
import {NgStyle} from "@angular/common";
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
  @Output() productSelected = new EventEmitter<Product>();
  addToPanier() {
    this.productSelected.emit(new Product(this.product.id, this.product.title, this.product.price, this.product.images, this.product.description));
  }
  getColor() {
    return this.product.inStock > 0 ? 'green' : 'red';
  }
  getState() {
    return this.product.inStock > 0 ? 'En stock' : 'En rupture de stock';
  }
}
