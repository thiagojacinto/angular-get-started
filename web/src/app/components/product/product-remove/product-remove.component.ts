import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: "app-product-remove",
  templateUrl: "./product-remove.component.html",
  styleUrls: ["./product-remove.component.css"],
})
export class ProductRemoveComponent implements OnInit {
  product: Product;
  
  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.service.getById(id).subscribe((found) => {
      this.product = found;
    })
  }

  delete(): void {
    const idToDelete = this.product.id.toString();
    this.service.delete(idToDelete).subscribe(() => {
      this.service.showMessage(
        `The item id. ${idToDelete} was removed from database.`
      );
    });
    this.navigateToProducts();
  }

  navigateToProducts(): void {
    this.router.navigate(["/products"]);
  }
}
