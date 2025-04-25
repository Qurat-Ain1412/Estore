import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { Products } from '../interface/products';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-product-detail-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailDialogComponent {
  constructor(
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public product: Products
  ) {}

  productDetails(prod: Products): void {
    console.log('product: -> ', prod);
    console.log(prod._id);

    const detail = this.productService.getProduct(prod._id).subscribe({
      next: (product) => {
        console.log('Product details:', product);
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      },
    });
    console.log('details:', detail);
  }

  closeDialog() {}
}
