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
}
