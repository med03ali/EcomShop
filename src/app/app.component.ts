import { Component, OnInit } from '@angular/core'; // <--- Ajouter OnInit
import { Title, Meta } from '@angular/platform-browser'; // <--- IMPORT SEO CRUCIAL
import { RouterOutlet } from '@angular/router';
import { ListProduitsComponent } from "./list-produits/list-produits.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListProduitsComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit { // <--- Implémenter OnInit
  title = 'ecom-app';
  cartItemCount: number = 0;

  // Injection des services SEO
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    // 1. DÉFINIR LE TITRE PRINCIPAL DU SITE
    this.titleService.setTitle('3eskariShop - Vente en ligne High-Tech & Lifestyle Maroc');

    // 2. DÉFINIR LA DESCRIPTION PRINCIPALE (Ce qu'on voit sous le lien bleu Google)
    this.metaService.addTag({ 
      name: 'description', 
      content: 'Découvrez 3eskariShop : Votre destination n°1 au Maroc pour les PC portables, smartphones, produits de beauté et décoration. Livraison rapide et paiement à la livraison.' 
    });

    // 3. MOTS CLÉS (Optionnel mais bien pour le projet)
    this.metaService.addTag({ name: 'keywords', content: 'ecommerce maroc, pc portable rabat, achat en ligne, 3eskariShop' });

    // 4. OPEN GRAPH (Pour un joli partage sur WhatsApp/Facebook)
    this.metaService.addTag({ property: 'og:title', content: '3eskariShop - Le meilleur du E-commerce' });
    this.metaService.addTag({ property: 'og:image', content: 'https://votre-site.com/assets/logo-partage.jpg' });
  }

  onSearchedText(searchKey: string) {
    console.log('Search for:', searchKey);
  }

  onCategorySelected(category: string) {
    console.log('Category selected:', category);
  }

  updateCartItemCount(count: number) {
    this.cartItemCount = count;
  }
}