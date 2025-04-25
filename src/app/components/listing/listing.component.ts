import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Products } from '../../interface/products';
import { ProductsService } from '../../services/products.service';
import { Dialog } from '@angular/cdk/dialog';
import { UpdateProductComponent } from '../../update-product/update-product.component';

@Component({
  selector: 'app-listing',
  imports: [NavbarComponent, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css',
})
export class ListingComponent {
  product: Products[] = [];

  constructor(private productService: ProductsService) {}
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  openEditDialog(id: string) {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      data: { productId: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result: ', result);
      this.fetchProducts();
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log('Product deleted Seccessfully!');
        this.fetchProducts();
      },
      error: (error) => {
        console.log('Error occurred while deleting a product!');
      },
    });
  }
}
