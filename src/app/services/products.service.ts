import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../interface/products';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient,) { }

  http = inject(HttpClient)

  getProducts() {
    return this.http.get<Products[]>('http://localhost:3000/api/products/list')
  }

  // productsListing() {
  //   let httpHeaders = new HttpHeaders({
  //     'content-Type': 'application/json'
  //   });
  //   return this.httpClient.get('http://localhost:3000/api/products/list', {headers: httpHeaders})
  // }
}
