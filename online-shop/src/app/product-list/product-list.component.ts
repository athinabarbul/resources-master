import { Component, OnInit, OnDestroy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';

import { ProductModel } from '../product/product-model';
import { ProductService } from '../product/service/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  listOfProducts: ProductModel[] = [];
  listOfProductsObserv$: Observable<ProductModel[]>;

  constructor(private http: HttpClient, private router: Router, private productService: ProductService) {
  }

  ngOnInit() {
     this.listOfProductsObserv$ = this.productService.getProducts();

     this.listOfProductsObserv$.subscribe((data)  => {
     this.listOfProducts = data;
    });
  }


goToProductDetails(i: number, listOfProducts: ProductModel[]): void {
  this.router.navigate(['/product/' + listOfProducts[i].id]);
}

}
