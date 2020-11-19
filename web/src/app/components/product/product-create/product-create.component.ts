import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from "../product.service"

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    nome: "Testing master",
    descricao: "Usado para testes",
    precoUnitario: 101.59,
    marcaId: 1,
    fornecedorId: 1,
    faqs: [1]
  }
  
  constructor(private router: Router,
    private service: ProductService) {}

  ngOnInit(): void {}

  navigateToProducts(): void {
    this.router.navigate(["/products"]);
  }

  create(): void {
    this.service.create(this.product).subscribe(() => {
      this.service.showMessage("Product added successfully")
      this.router.navigate(["/products"]);
    });
  }
}
