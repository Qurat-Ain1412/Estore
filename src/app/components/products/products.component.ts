import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
//   products = [
//     { image: "assets/Books1.jpg", name: "Book 1" },
//     { image: "assets/Books2.jpg", name: "Book 2" },
//     { image: "assets/Books3.jpg", name: "Book 3" },
//     { image: "assets/Books1.jpg", name: "Book 4" },
//     { image: "assets/Books2.jpg", name: "Book 5" },
//     { image: "assets/Books3.jpg", name: "Book 6" },
//     { image: "assets/Books1.jpg", name: "Book 7" },
//     { image: "assets/Books2.jpg", name: "Book 8" },
//     { image: "assets/Books3.jpg", name: "Book 9" }
// ];

// constructor(private productService: ProductsService) {}

products: any[] = []; // Initialize as empty array
isLoading: boolean = true;
errorMessage: string = '';

constructor(private productService: ProductsService) {}

ngOnInit(): void {
  this.loadProducts();
  const prod = this.productService.getProducts().subscribe((products) => {
    this.products = products.map(product => ({
      ...product,
      image: product.image // Full URL
      
    })
  );
  });
  console.log("product: ", this.products)
  // console.log("image: ", this.pr);
}

loadProducts(): void {
  this.isLoading = true;
  this.errorMessage = '';
  
  this.productService.getProducts().subscribe((products) => {
    this.products = products.map(product => ({
      ...product,
      image: product.image.startsWith('http')
        ? product.image
        : `https://localhost:3000/${product.image}`
    }));
    
  });
}

productDetails(productId: number): void {
  this.productService.getProduct(productId).subscribe({
    next: (product) => {
      console.log('Product details:', product);
      // Here you can:
      // 1. Navigate to a details page
      // 2. Show a modal with details
      // 3. Or any other action you want
    },
    error: (err) => {
      console.error('Error fetching product details:', err);
    }
  });
}

// productDetails(productId: number) {
//   this.productService.getProduct(productId).subscribe({
//     next: (products) => {
      
//     }
//   })
// }

}
