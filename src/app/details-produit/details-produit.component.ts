import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { SharedService } from '../shared-service.service';
import { ProduitService } from "../produit.service";
import {NgClass, NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produit.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitsComponent implements OnInit {
  product!: Product;  // Define the product attribute of type Product

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      // Subscribe to the observable returned by getProductById
      this.produitService.getProductById(+productId).subscribe(
        (product: Product | undefined) => {
          if (product) {
            this.product = product; // Assign the fetched product to the product attribute
          } else {
            console.error('Product not found');
          }
        },
        error => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  getColor() {
    return this.product?.stock > 0 ? 'green' : 'red';
  }

  getState() {
    return this.product?.stock > 0 ? 'In Stock' : 'En rupture de stock';
  }

  addToPanier() {
    if (this.product) {
      this.sharedService.addProductToCart({ produit: this.product, quantite: 1 });
    }
  }
}
