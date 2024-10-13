import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = 'https://dummyjson.com/products/category-list';
  private productSearchUrl = 'https://dummyjson.com/products/search?q=';

  constructor(private http: HttpClient) {}

  // Fetch categories
  getCategories() {
    return this.http.get<string[]>(this.categoryUrl);
  }

  // Fetch products by category
  getProductsByCategory(category: string) {
    return this.http.get(`https://dummyjson.com/products/category/${category}`);
  }

  // Fetch products based on search key
  getProductBykey(searchKey: string) {
    return this.http.get(`${this.productSearchUrl}${searchKey}`);
  }
}
