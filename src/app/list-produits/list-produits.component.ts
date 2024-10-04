import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { ProductItemComponent } from "../product-item/product-item.component";
import { LignePanier } from '../models/LignePanier';
import {NavbarComponent} from "../navbar/navbar.component";
import {PanierComponent} from "../panier/panier.component";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-list-produits',
  standalone: true,
  imports: [ProductItemComponent, NavbarComponent, PanierComponent, NgIf],
  templateUrl: './list-produits.component.html',
  styleUrl: './list-produits.component.css'
})
export class ListProduitsComponent {
  items: LignePanier[] = [];
  produits : Array<Product> = [
    new Product(1, 'Laptop',5000,['https://static3.webx.pk/files/4012/Images/ezgif.com-gif-maker-59-4012-1267978-130922010146831.jpg'] , 'Laptop HP',200),
    new Product(2, 'Tablet',6000,['https://guide-images.cdn.ifixit.com/igi/rVGIBHUPjHcUJWoB.medium'], 'Tablet Samsung',31),
    new Product(3, 'Smartphone',8700,['https://i1.wp.com/witchdoctor.co.nz/wp-content/uploads/2019/07/samsung-a50-2.jpg?resize=1000%2C820&ssl=1'], 'Smartphone Samsung',100),
    new Product(4, 'Television',9000,['https://images.samsung.com/is/image/samsung/ae_UA46EH6030RXZN_005_Front_black?$L2-Thumbnail$'], 'Television Samsung',100),
    new Product(5, 'Refrigerateur',9800,['https://th.bing.com/th/id/R.d3220ab9dcf35e8fe7343e67e691ae9e?rik=WF3wp%2bJrXqzgnw&riu=http%3a%2f%2fimage.darty.com%2fencastrable%2fgrand_refrigerateur%2frefrigerateur_americain%2fsamsung_rf24fsedbsr_k1404233789888D_144939267.jpg&ehk=ZETesGCYskaWJTa8P2qVu5PNMNGzPLi5XAS1rR1t4RY%3d&risl=&pid=ImgRaw&r=0'], 'Refrigerateur Samsung',0),
    new Product(6, 'Watch',4000, ['https://th.bing.com/th/id/OIF.KCB9CieAxcDiuMwmQ2BsGQ?rs=1&pid=ImgDetMain'] ,'Samsung Watch',12),
  ];
  panierSelected: boolean = false;


  constructor(private http: HttpClient) {

  }
/*
  ngOnInit(): void {
      this.getProduits();
  }
  getProduits() {
    debugger;
    this.http.get('https://dummyjson.com/products/category/smartphones').subscribe((data:any) => {
      this.produits = data.products;
    })
  }
*/
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
}
