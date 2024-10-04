import { Component, Input } from '@angular/core';
import { LignePanier } from '../models/LignePanier';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  @Input() items: LignePanier[] = [];
}
