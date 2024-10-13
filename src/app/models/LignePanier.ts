import { Product } from "./Product";

export class LignePanier{
    produit!: Product;
    quantite!: number;

    constructor(produit: Product, quantite: number){
        this.produit = produit;
        this.quantite = quantite;
    }
}