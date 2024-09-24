export class Product {
    id: number;
    nom: string;
    prix: number;
    imageURL: string;
    description: string;

    constructor(id: number, nom: string, prix: number, imageURL: string, description: string) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.imageURL = imageURL;
        this.description = description;
    }
}