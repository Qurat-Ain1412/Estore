import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-products',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    { image: "assets/Books1.jpg", name: "Book 1" },
    { image: "assets/Books2.jpg", name: "Book 2" },
    { image: "assets/Books3.jpg", name: "Book 3" },
    { image: "assets/Books1.jpg", name: "Book 4" },
    { image: "assets/Books2.jpg", name: "Book 5" },
    { image: "assets/Books3.jpg", name: "Book 6" },
    { image: "assets/Books1.jpg", name: "Book 7" },
    { image: "assets/Books2.jpg", name: "Book 8" },
    { image: "assets/Books3.jpg", name: "Book 9" }
];



}
