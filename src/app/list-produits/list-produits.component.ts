import { Component } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-list-produits',
  standalone: true,
  imports: [],
  templateUrl: './list-produits.component.html',
  styleUrl: './list-produits.component.css'
})
export class ListProduitsComponent {
  produits : Array<Product> = [
    new Product(1, 'Laptop', 5000,'', 'Laptop HP'),
    new Product(2, 'Tablet', 6000,'', 'Tablet Samsung'),
    new Product(3, 'Smartphone', 6500,'', 'Smartphone Samsung'),
    new Product(4, 'Television', 7000,'', 'Television Samsung'),
    new Product(5, 'Refrigerateur', 8000,'', 'Refrigerateur Samsung')
  ]
}
