import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './category.service';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input() panier!: boolean;
  @Input() nbrItemsSelected: number = 0;
  @Output() panierSelected = new EventEmitter();
  @Output() searchedText = new EventEmitter(); // Emits searched text
  @Output() selectedCategoryEmmiter = new EventEmitter();

  categories: string[] = [];
  selectedCategory: string = '';
  products: any[] = []; // All products fetched from the API
  filteredProducts: any[] = []; // Products filtered based on user input
  searchKey: string = ''; // Track the search key input

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // Fetch categories on init
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }



  // Emit searched text and get product suggestions
  onSearchByKey() {
    this.searchedText.emit(this.searchKey);
  }



  // Filter products based on the search key
  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchKey.toLowerCase())
    );
  }

  // Toggle the display of the shopping cart
  showPanier() {
    this.panier = !this.panier;
    this.panierSelected.emit(this.panier);
  }

  // Emit both category and product name when searching
  search() {
    this.selectedCategoryEmmiter.emit(this.selectedCategory);
  }
}
