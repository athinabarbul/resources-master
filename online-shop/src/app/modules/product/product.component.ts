import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  HttpClient  } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { ProductModel } from '../../data/schema/product-model';
import { CartService } from '../../data/service/cart-service/cart.service';
import { ProductService } from '../../data/service/product-service/product.service';
import * as ProductsActions from "../../shared/actions/products.actions";
import { CartItemModel } from 'src/app/data/schema/cart-item-model';
import * as CartActions from "../../shared/actions/cart.actions";

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
    private store: Store<{fromProducts: {products: ProductModel[]}}>,
    private storeCart: Store<{fromCart: {cartItem: CartItemModel[]}}>) { }

  ngOnInit() {

    this.product$ = this.productService.getSingleProductItem();

    this.productSubscription = this.product$.subscribe(product => {
      this.currentProduct = product;
    })

  }

  addProductToCart(): void {
    this.storeCart.dispatch(new CartActions.AddNewCartProduct(this.cartService.newCartItem));
    this.cartService.addProductToCart(this.currentProduct);
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
