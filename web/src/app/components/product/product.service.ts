import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar"
import { Observable } from 'rxjs';

import { Product } from "./product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = "http://localhost:4201/products";

  constructor(private warning: MatSnackBar, private http: HttpClient) {}

  showMessage(message: string): void {
    this.warning.open(message, "Close", {
      duration: 3500,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  getList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: string): Observable<Product> {
    const productURL = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(productURL);
  }

  update(product: Product): Observable<Product> {
    const productURL = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(productURL, product);
  }
}
