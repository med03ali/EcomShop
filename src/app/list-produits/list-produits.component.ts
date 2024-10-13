import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductItemComponent } from "../product-item/product-item.component";
import { LignePanier } from '../models/LignePanier';
import {NavbarComponent} from "../navbar/navbar.component";
import {PanierComponent} from "../panier/panier.component";
import {NgIf} from "@angular/common";
import {ProduitService} from "./produit.service";


@Component({
  selector: 'app-list-produits',
  standalone: true,
  imports: [ProductItemComponent, NavbarComponent, PanierComponent, NgIf],
  templateUrl: './list-produits.component.html',
  styleUrl: './list-produits.component.css'
})
export class ListProduitsComponent implements OnInit{
  items: LignePanier[] = [];

  panierSelected: boolean = false;

  produits! : Array<Product>;
  //searchQuery: string = 'https://dummyjson.com/products/';


  constructor(private produitService: ProduitService) {

  }

  onProductSelected($event: Product) {
    const productExists = this.items.find(item => item.produit.title === $event.title);

    if (productExists) {
      productExists.quantite++;
    } else {
      this.items.push(new LignePanier($event, 1));
    }  }

  onPanierSelected($event: boolean) {
    console.log($event);
    this.panierSelected = $event;
  }

  onSearch($event: string) {

      this.produitService.getCategory($event).subscribe((data:any) => {
        this.produits = data.products;
      });

  }

  ngOnInit(): void {
    this.produitService.getProduits().subscribe((data:any) => {
      this.produits = data.products;})
  }
  onSearchedText($event: string) {
    this.produitService.getProductBykey($event).subscribe((data:any) => {
      this.produits = data.products;})
  }
  getCartItemCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantite, 0);
  }

}
