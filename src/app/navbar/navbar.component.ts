import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() panier!: boolean;
  @Output() panierSelected = new EventEmitter();

  showPanier() {
    this.panier = !this.panier;
    this.panierSelected.emit(this.panier);
  }
}
