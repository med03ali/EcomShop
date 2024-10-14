import { Routes } from '@angular/router';
import {ListProduitsComponent} from "./list-produits/list-produits.component";
import {PanierComponent} from "./panier/panier.component";
import {DetailsProduitsComponent} from "./details-produit/details-produit.component";
import {AuthGuardService} from "./auth-guard.service";
import {AuthentificationComponent} from "./authentification/authentification.component";

export const routes: Routes = [
  {path : '', component : ListProduitsComponent},
  {path : 'panier', component : PanierComponent, canActivate: [AuthGuardService]},
  { path: 'product/:id', component: DetailsProduitsComponent },
  { path: 'signin', component: AuthentificationComponent }


];
