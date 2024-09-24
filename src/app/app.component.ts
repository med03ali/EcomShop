import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListProduitsComponent } from "./list-produits/list-produits.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListProduitsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecom-app';
  filliere : string =  'Genie informatique';
}
