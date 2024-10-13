import { Injectable } from '@angular/core';
import {LignePanier} from "../models/LignePanier";

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  productsSelected: LignePanier[] = [];
  constructor() { }

  addProduct(product: LignePanier) {
    this.productsSelected.push(product);
  }
}
