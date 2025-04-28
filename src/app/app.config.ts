import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
// routes
const routes: Routes = [
  {
    path: 'admin-ui',
    title: 'Home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () =>
      import('./components/user/user-dashboard/user-dashboard.component').then((m) => m.UserDashboardComponent),
  },
  {
    path: 'products',
    title: 'Products',
    loadComponent: () =>
      import('./components/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'about',
    title: 'About Us',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'add-product',
    title: 'Add Product',
    loadComponent: () =>
      import('./components/add-product/add-product.component').then(
        (m) => m.AddProductComponent
      ),
  },
  {
    path: 'listing',
    title: 'Listing',
    loadComponent: () =>
      import('./components/listing/listing.component').then(
        (m) => m.ListingComponent
      ),
  },

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
