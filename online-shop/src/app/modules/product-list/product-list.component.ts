import { Component, OnInit, OnDestroy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';

import { ProductModel } from '../../data/schema/product-model';
import { ProductService } from '../../data/service/product-service/product.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/data/service/cart-service/cart.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

  listOfProductsSubscription: Subscription;
  listOfProducts: ProductModel[] = [];
  listOfProductsObserv$: Observable<ProductModel[]>;

    constructor(private http: HttpClient, private router: Router,
       private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit() {
     
     this.cartService.loadCartItems();
     this.listOfProductsObserv$ = this.productService.getItems();
     this.listOfProductsSubscription = this.listOfProductsObserv$.subscribe( data => {
       this.listOfProducts = data;
       this.productService.lastId = data.length;      
     })
     
  }


  goToProductDetails(i: number): void {
  this.productService.navigateToProductId = this.listOfProducts[i].id;
  this.productService.loadSingleProduct();
  this.router.navigate(['/product/' + this.productService.navigateToProductId]);
  }

  ngOnDestroy() {
    if ( this.listOfProductsSubscription){
      this.listOfProductsSubscription.unsubscribe();
    }
  }
}
