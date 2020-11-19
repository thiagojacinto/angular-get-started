import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  editedProduct: Product;

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.service.getById(id).subscribe((found) => {
      this.editedProduct = found;
    });
  }

  update(): void {
    this.service.update(this.editedProduct).subscribe(() => {
      this.service.showMessage(`Item id. ${this.editedProduct.id} updated.`);
      this.navigateToProducts();
    });
  }

  navigateToProducts(): void {
    this.router.navigate(["/products"]);
  }
}
