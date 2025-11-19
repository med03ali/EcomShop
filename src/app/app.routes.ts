import { Routes } from '@angular/router';
import { ListProduitsComponent } from "./list-produits/list-produits.component";
import { PanierComponent } from "./panier/panier.component";
import { DetailsProduitsComponent } from "./details-produit/details-produit.component"; // Vérifiez que le nom du fichier est bien celui-ci
import { AuthentificationComponent } from "./authentification/authentification.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './auth-guard.service';

export const routes: Routes = [
  { path: '', component: ListProduitsComponent },
  
  // Route pour les catégories (Essentiel pour le SEO "Silo")
  // Permet d'avoir des URLs comme : /category/smartphones
  { path: 'category/:name', component: ListProduitsComponent },

  { path: 'panier', component: PanierComponent },
  
  // CORRECTION : Doit correspondre au routerLink du ProductItemComponent
  // Avant : 'product/:id' -> Maintenant : 'details-produit/:id'
  { path: 'details-produit/:id', component: DetailsProduitsComponent },
  
  { path: 'signin', component: AuthentificationComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignupComponent },

  // Optionnel : Rediriger les URLs inconnues vers l'accueil
  { path: '**', redirectTo: '' }
];