import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product/product-model';
import { ProductService } from '../product/service/product.service';

import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  listOfProducts: ProductModel[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
      this.listOfProducts = this.productService.getProducts();
  }

  goToProductDetails(i: number): void{
    this.router.navigate(['/product/' + this.listOfProducts[i].id]);
  }

}
