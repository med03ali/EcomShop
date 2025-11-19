import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { SharedService } from '../shared-service.service';
import { ProduitService } from "../produit.service";
import { NgClass, NgForOf, NgStyle, NgIf, CommonModule } from "@angular/common";
import { Comment } from '../models/Comment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/User';

// IMPORTS SEO AJOUTÉS
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser'; 

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
  product!: Product;
  comments: Comment[] = [];
  commentForm: FormGroup;
  currentUser!: User;
  isFormVisible: boolean = false;
  
  // Variable pour stocker le script JSON-LD sécurisé
  jsonLD!: SafeHtml; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private sharedService: SharedService,
    // INJECTION DES SERVICES SEO
    private titleService: Title,
    private metaService: Meta,
    private sanitizer: DomSanitizer 
  ) {
    this.commentForm = this.fb.group({
      comment: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      rating: this.fb.control('', [Validators.required, Validators.min(1), Validators.max(5)])
    });
  }

  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.produitService.getProductById(+productId).subscribe(
        (product: Product | undefined) => {
          if (product) {
            this.product = product;
            // APPEL DE LA FONCTION SEO DÈS QUE LE PRODUIT EST CHARGÉ
            this.updateSEO(); 
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

  // --- NOUVELLE MÉTHODE : LOGIQUE SEO ---
  updateSEO() {
    // 1. Titre Dynamique (Ex: "Mascara - 3eskariShop")
    this.titleService.setTitle(`${this.product.title} - Meilleur Prix | 3eskariShop`);

    // 2. Meta Description (Coupe à 160 caractères max)
    const description = `Achetez ${this.product.title} à seulement ${this.product.price}$. ${this.product.description.substring(0, 100)}... En stock.`;
    this.metaService.updateTag({ name: 'description', content: description });

    // 3. Open Graph (Pour Facebook/WhatsApp)
    this.metaService.updateTag({ property: 'og:title', content: this.product.title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    // Supposons que product.images[0] est l'image principale
    if(this.product.images && this.product.images.length > 0) {
        this.metaService.updateTag({ property: 'og:image', content: this.product.images[0] });
    }

    // 4. JSON-LD (Données Structurées pour Google)
    const json = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": this.product.title,
      "image": this.product.images,
      "description": this.product.description,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": this.product.price,
        "availability": this.product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    };

    // On doit "Sanitizer" le script pour qu'Angular accepte de l'insérer dans le HTML
    this.jsonLD = this.sanitizer.bypassSecurityTrustHtml(`
      <script type="application/ld+json">
        ${JSON.stringify(json)}
      </script>
    `);
  }
  // --------------------------------------

  loadUserFromLocalStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
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
    if (this.currentUser) {
      this.isFormVisible = !this.isFormVisible;
    } else {
      alert("You should be signed in to comment");
    }
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
      this.isFormVisible = false;
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