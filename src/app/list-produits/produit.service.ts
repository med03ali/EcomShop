import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produits : Array<Product> = [
    new Product(1, 'Laptop',5000,['https://static3.webx.pk/files/4012/Images/ezgif.com-gif-maker-59-4012-1267978-130922010146831.jpg'] , 'Laptop HP',200),
    new Product(2, 'Tablet',6000,['https://guide-images.cdn.ifixit.com/igi/rVGIBHUPjHcUJWoB.medium'], 'Tablet Samsung',31),
    new Product(3, 'Smartphone',8700,['https://i1.wp.com/witchdoctor.co.nz/wp-content/uploads/2019/07/samsung-a50-2.jpg?resize=1000%2C820&ssl=1'], 'Smartphone Samsung',100),
    new Product(4, 'Television',9000,['https://images.samsung.com/is/image/samsung/ae_UA46EH6030RXZN_005_Front_black?$L2-Thumbnail$'], 'Television Samsung',100),
    new Product(5, 'Refrigerateur',9800,['https://th.bing.com/th/id/R.d3220ab9dcf35e8fe7343e67e691ae9e?rik=WF3wp%2bJrXqzgnw&riu=http%3a%2f%2fimage.darty.com%2fencastrable%2fgrand_refrigerateur%2frefrigerateur_americain%2fsamsung_rf24fsedbsr_k1404233789888D_144939267.jpg&ehk=ZETesGCYskaWJTa8P2qVu5PNMNGzPLi5XAS1rR1t4RY%3d&risl=&pid=ImgRaw&r=0'], 'Refrigerateur Samsung',0),
    new Product(6, 'Watch',4000, ['https://th.bing.com/th/id/OIF.KCB9CieAxcDiuMwmQ2BsGQ?rs=1&pid=ImgDetMain'] ,'Samsung Watch',12),
  ];
  searchQuery: string = 'https://dummyjson.com/products/';

  constructor(private http : HttpClient) { }



  getProduits() {
    return this.http.get(this.searchQuery);
  }

  getCategory(category : string) {
    return this.http.get(`${this.searchQuery}/category/${category}`);
  }
  getProductBykey(text : string){
    return this.http.get(`https://dummyjson.com/products/search?q=${text}`)
  }
}
