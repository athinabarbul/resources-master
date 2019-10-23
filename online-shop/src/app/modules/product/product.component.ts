import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from '../../data/schema/product-model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { CartService } from '../../data/service/cart-service/cart.service';
import { ProductService } from '../../data/service/product-service/product.service';
import { ActivatedRoute } from '@angular/router';
import {  Router } from '@angular/router';
import * as ProductsActions from "../../shared/actions/products.actions";

import {  HttpClient  } from "@angular/common/http";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product$: Observable<ProductModel>;
  currentProduct: ProductModel = undefined;
  productSubscription: Subscription;
  id: number;
  

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private productService: ProductService,
    private cartService: CartService, private router: Router,
    private store: Store<{fromProducts: {products: ProductModel[]}}>) { }

  ngOnInit() {

    this.product$ = this.productService.getSingleProductItem();

    this.productSubscription = this.product$.subscribe(product => {
      this.currentProduct = product;
    })

  }

  addProductToCart(): void {
    this.cartService.addProductToCart(this.currentProduct);
    alert('Product ' + this.currentProduct.name +  ' added to cart');
  }

  deleteProduct(): void {
    this.productService.deletedProductId = this.currentProduct.id;
    this.store.dispatch(new ProductsActions.DeleteProduct(this.productService.deletedProductId));
    this.productService.deleteProduct();
    this.router.navigate(['/product-list']);
  }

  goToProductEdit(i: number, currentProduct: ProductModel): void {
    this.router.navigate(['/edit-product/' + currentProduct.id]);
  }

  ngOnDestroy(): void{
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
