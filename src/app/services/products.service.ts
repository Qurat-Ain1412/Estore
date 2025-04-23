import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../interface/products';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient,) { }

  http = inject(HttpClient)

  getProducts() {
    return this.http.get<Products[]>('http://localhost:3000/api/products/list')
  }

  getProduct(id: any) {
    return this.http.get<Products>(`http://localhost:3000/api/products/${id}`)
  }

  addProduct(formData: FormData) : Observable<Products> {
    return this.http.post<Products>('http://localhost:3000/api/products/add', formData)
  }

  // productsListing() {
  //   let httpHeaders = new HttpHeaders({
  //     'content-Type': 'application/json'
  //   });
  //   return this.httpClient.get('http://localhost:3000/api/products/list', {headers: httpHeaders})
  // }
}
