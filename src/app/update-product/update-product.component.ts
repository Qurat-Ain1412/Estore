import { Component, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from '../interface/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-update-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService
  ) {
    console.log('id=> ', data.productId);
  }
  prod: Products = {
    _id: '',
    name: '',
    price: 0,
    quantity: 0,
    image: '',
  };

  selectedImage: File | null = null;

  ngOnInit() {
    this.productService.getProduct(this.data.productId).subscribe({
      next: (product) => {
        this.prod = {
          _id: product._id,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          image: product.image,
        };
        console.log('✅ Product details after fetch: ', this.prod); // ← Runs after data arrives
        this.display();
      },
      error: (err) => {
        console.error('Error while fetching details', err);
      },
    });
  }
  display() {
    console.log(this.prod.image);
  }

  updateProduct(id: string, updatedData: any) {
    const formData = new FormData();

    formData.append('name', updatedData.name);
    formData.append('price', updatedData.price);
    formData.append('quantity', updatedData.quantity);

    if (this.selectedImage) formData.append('image', this.selectedImage);

    this.productService.editProduct(id, formData).subscribe({
      next: (product) => {
        console.log('Details after updation: ', product);
      },
      error: (error) => {
        console.log('Error occurred while updating the product!');
      },
    });
  }

  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  // onSubmit() {
  //   this.updateProduct(this.data.productId, )
  // }

  // console.log("Product Data 2: ", this.product);
}
