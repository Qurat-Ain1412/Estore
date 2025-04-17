import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { routes } from './app.routes';


// Define your routes
const routes: Routes = [
  { 
    path: '', 
    title: 'Home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'products',
    title: 'Products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent)
  },
  { 
    path: 'about',
    title: 'About Us',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  }, 
  {
    path: 'add-product',
    title: 'Add Product',
    loadComponent: () => import('./add-product/add-product.component').then(m=> m.AddProductComponent)
  },
  {
    path: 'listing', 
    title: 'Listing', 
    loadComponent: () => import('./listing/listing.component').then(m => m.ListingComponent)
  } 
];


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
