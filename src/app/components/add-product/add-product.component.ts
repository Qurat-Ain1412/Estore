import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../interface/products';

@Component({
  selector: 'app-add-product',
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product: Products = {
    name: '',
    quantity: 0,
    price: 0,
    image: ''
  };

  selectedImageFile!: File;

  constructor(private productService: ProductsService) {}

  // this will be triggered when file input changes
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('quantity', this.product.quantity.toString());
    formData.append('price', this.product.price.toString());

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    this.productService.addProduct(formData).subscribe({
      next: (res) => {
        console.log('Product added:', res);
        // Optionally reset form here
      },
      error: (err) => {
        console.error('Upload failed:', err);
      }
    });
  }
}
