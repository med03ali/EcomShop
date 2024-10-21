import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from "./models/Product";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produits: Array<Product> = [];

  searchQuery: string = 'https://dummyjson.com/products/';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<any> {
    return this.http.get(this.searchQuery);
  }

  getCategory(category: string): Observable<any> {
    return this.http.get(`${this.searchQuery}/category/${category}`);
  }

  getProductByKey(text: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/search?q=${text}`);
  }

  // Method to fetch product by ID (either from local list or API)
  getProductById(id: number): Observable<Product | undefined> {
    // Search for product in the local list
    const foundProduct = this.produits.find(product => product.id === id);

    /*if (foundProduct) {
      // If product is found in the local array, return it as an Observable
      return of(foundProduct);
    } else {*/
      // If product is not found in the local array, fetch it from the API (assuming API supports this)
      return this.http.get<Product>(`${this.searchQuery}/${id}`);

  }
}
