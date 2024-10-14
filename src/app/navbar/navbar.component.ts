import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './category.service';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ProduitService} from "../produit.service";
import {SharedService} from "../shared-service.service";
import {AuthService} from "../auth.service";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink, RouterOutlet, NgForOf, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {


  categories: string[] = [];
  selectedCategory: string = '';
  products: any[] = []; // All products fetched from the API
  filteredProducts: any[] = []; // Products filtered based on user input
  searchKey: string = ''; // Track the search key input
  loggedIn: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProduitService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {}
  signIn() {
    this.authService.login();
    this.loggedIn = true;
  }
  signOut() {
    this.authService.logout();
    this.loggedIn = false;
  }

  ngOnInit(): void {
    // Fetch categories on init
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    // Fetch products on init
    this.productService.getProduits().subscribe((data: any) => {
      this.products = data.products;
    });
  }

  // Emit searched text and filter product suggestions
  onSearchByKey() {
    this.sharedService.setSearchKey(this.searchKey);

    // Filter products based on the search key
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchKey.toLowerCase())
    );
  }

  // Emit selected category
  search() {
    this.sharedService.setSelectedCategory(this.selectedCategory);
  }
}
