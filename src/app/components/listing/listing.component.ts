import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Products } from '../../interface/products';
// import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
// import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-listing',
  imports: [NavbarComponent, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  users: any[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.productService.getProducts().subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }
}
