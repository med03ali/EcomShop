import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { LignePanier } from '../models/LignePanier';
import { ProduitService } from '../produit.service';
import { SharedService } from '../shared-service.service';
import {ProductItemComponent} from "../product-item/product-item.component";

@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.css'],
  imports: [
    ProductItemComponent
  ],
  standalone: true
})
export class ListProduitsComponent implements OnInit {
  items: LignePanier[] = [];
  produits: Array<Product> = [];

  constructor(private produitService: ProduitService, private sharedService: SharedService) {}

  ngOnInit(): void {
    // Load initial products
    this.produitService.getProduits().subscribe((data: any) => {
      this.produits = data.products;
    });

    // Subscribe to the search key and update products
    this.sharedService.searchKey$.subscribe((searchKey) => {
      if (searchKey) {
        this.onSearchedText(searchKey);
      }
    });

    // Subscribe to the selected category and update products
    this.sharedService.selectedCategory$.subscribe((category) => {
      if (category) {
        this.onSearch(category);
      }
    });
  }

  onProductSelected(product: Product) {
    const productExists = this.items.find((item) => item.produit.title === product.title);
    if (productExists) {
      productExists.quantite++;
    } else {
      this.items.push(new LignePanier(product, 1));
    }

    // Update cart item count in the shared service
    this.sharedService.setCartItemCount(this.getCartItemCount());
  }

  onSearch(category: string) {
    this.produitService.getCategory(category).subscribe((data: any) => {
      this.produits = data.products;
    });
  }

  onSearchedText(searchKey: string) {
    this.produitService.getProductByKey(searchKey).subscribe((data: any) => {
      this.produits = data.products;
    });
  }

  getCartItemCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantite, 0);
  }
}
