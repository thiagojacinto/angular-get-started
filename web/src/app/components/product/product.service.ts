import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private warning: MatSnackBar) { }

  showMessage(message: string): void {
    this.warning.open(message, "Close", {
      duration: 3500,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }
}
