import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/Product';
import { LignePanier } from '../models/LignePanier';
import {NgStyle} from "@angular/common";
import {SharedService} from "../shared-service.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  constructor(private sharedService: SharedService, private router: Router) {}
  addToPanier(event: Event) {
    event.stopPropagation(); // Prevent event bubbling to parent container
    const productToAdd = new LignePanier(this.product, 1);
    this.sharedService.addProductToCart(productToAdd);
  }
  getColor() {
    return this.product.stock > 0 ? 'green' : 'red';
  }
  getState() {
    return this.product.stock > 0 ? 'In Stock' : 'Not in Stock';
  }
  onComponentClick(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
