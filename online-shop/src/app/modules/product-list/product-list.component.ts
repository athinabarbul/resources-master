import { Component, OnInit, OnDestroy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';

import { ProductModel } from '../../data/schema/product-model';
import { ProductService } from '../../data/service/product.service';
import { debug } from 'util';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

  listOfProductsSubscription: Subscription;
  listOfProducts: ProductModel[] = [];
  listOfProductsObserv$: Observable<ProductModel[]>;

  constructor(private http: HttpClient, private router: Router, private productService: ProductService) {
  }

  ngOnInit() {
     this.listOfProductsObserv$ = this.productService.getItems();

     this.listOfProductsSubscription = this.listOfProductsObserv$.subscribe( data => {
       this.listOfProducts = data;
     })
  }


  goToProductDetails(i: number): void {
  this.router.navigate(['/product/' + this.listOfProducts[i].id]);
  }

  ngOnDestroy() {
    if ( this.listOfProductsSubscription){
      this.listOfProductsSubscription.unsubscribe();
    }
  }
}
