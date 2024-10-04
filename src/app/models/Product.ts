export class Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    description: string;
    inStock: number;

    constructor(id: number, title: string, price: number, images: string[], description: string, inStock: number = 0){
        this.id = id;
        this.title = title;
        this.price = price;
        this.images = images;
        this.description = description;
        this.inStock = inStock;
    }
}
