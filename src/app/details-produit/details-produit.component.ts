import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { SharedService } from '../shared-service.service';
import { ProduitService } from "../produit.service";
import {NgClass, NgForOf, NgStyle, NgIf, CommonModule} from "@angular/common";
import { Comment } from '../models/Comment';
import { Form, FormBuilder, FormGroup,FormsModule,ReactiveFormsModule, Validators} from '@angular/forms';
import { User } from '../models/User';

@Component({
  selector: 'app-details-produits',
  templateUrl: './details-produit.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgStyle,
    ReactiveFormsModule,
    NgIf,
    CommonModule
  ],
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitsComponent implements OnInit {
  product!: Product;  // Define the product attribute of type Product
  comments : Comment[] = [];
  commentForm : FormGroup;
  currentUser!: User; 
  isFormVisible: boolean = false; // Property to track form visibility

  constructor(
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private sharedService: SharedService
  ) {
    this.commentForm = this.fb.group(
      {comment : this.fb.control('',[
        Validators.required, 
        Validators.minLength(3)
        ]
        ),
       rating : this.fb.control('',[
        Validators.required,
        Validators.min(1),
        Validators.max(5)
       ])
      }
    )
  }



  ngOnInit(): void {
    this.loadUserFromLocalStorage();

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      // Subscribe to the observable returned by getProductById
      this.produitService.getProductById(+productId).subscribe(
        (product: Product | undefined) => {
          if (product) {
            this.product = product; // Assign the fetched product to the product attribute
          } else {
            console.error('Product not found');
          }
        },
        error => {
          console.error('Error fetching product:', error);
        }
      );
    }

    this.loadComments();
  }

  loadUserFromLocalStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser); // Parse and assign the current user
    } else {
      console.error('No user found in local storage');
    }
  }

  getColor() {
    return this.product?.stock > 0 ? 'green' : 'red';
  }

  getState() {
    return this.product?.stock > 0 ? 'In Stock' : 'En rupture de stock';
  }

  addToPanier() {
    if (this.product) {
      this.sharedService.addProductToCart({ produit: this.product, quantite: 1 });
    }
  }

  toggleCommentForm() {
    if(this.currentUser){
    this.isFormVisible = !this.isFormVisible; }
    else{
      alert("You should be signed in to comment");
    }// Toggle the form visibility
  }

  get filteredComments() {
    return this.comments.filter(comment => comment.productId === this.product.id);
  }


  
  addComment() {
    if (this.commentForm.valid) {
      const newComment = new Comment(
        this.product.id,
        this.currentUser,
        new Date(),
        this.commentForm.get('comment')?.value,
        this.commentForm.get('rating')?.value
      );

      this.comments.push(newComment);
      this.saveCommentsToLocalStorage();
      this.commentForm.reset();
      this.isFormVisible = false; // Hide the form after submission
    }
  }

  private saveCommentsToLocalStorage() {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  private loadComments() {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments);
    }
  }

  

  
}
