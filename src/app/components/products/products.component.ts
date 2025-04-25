import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsService } from '../../services/products.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../../product-detail-dialog/product-detail-dialog.component';
import { Products } from '../../interface/products';

@Component({
  selector: 'app-products',
  imports: [NavbarComponent, CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  products: Products[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.isLoading = false;
    const prod = this.productService.getProducts().subscribe((products) => {
      this.products = products.map((product) => ({
        ...product,
        image: product.image,
      }));
      console.log(products);
    });
    console.log('product: ', this.products);
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe((products) => {
      this.products = products.map((product) => ({
        ...product,
        image: product.image.startsWith('http')
          ? product.image
          : `https://localhost:3000/${product.image}`,
      }));
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(ProductDetailDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  productDetails(prod: Products): void {
    console.log(prod);
    console.log(prod._id);

    const detail = this.productService.getProduct(prod._id).subscribe({
      next: (product) => {
        console.log('Product details:', product);
        this.dialog.open(ProductDetailDialogComponent, {
          data: product,
        });
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      },
    });
    console.log('details:', detail);
  }
}
