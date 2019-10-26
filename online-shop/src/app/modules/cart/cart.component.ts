import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { CartItemModel } from '../../data/schema/cart-item-model'
import { CartService } from '../../data/service/cart-service/cart.service'
import { AuthService } from 'src/app/data/service/auth-service/auth.service';
import * as CartActions from "../../shared/actions/cart.actions";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartListObservable$: Observable<CartItemModel[]>;
  cartList: CartItemModel[];
  cartSubscription: Subscription;

  constructor(private cartService: CartService, private authService: AuthService,
    private store: Store<{fromCart: {cartItem: CartItemModel[]}}>) { }

  ngOnInit() {

    this.cartListObservable$ = this.cartService.getCartItems();

    this.cartSubscription = this.cartListObservable$.subscribe( data => {
      this.cartList = data;
    })
  }

  removeCartItem(i:number) : void{

    this.store.dispatch(new CartActions.DeleteCartProduct(i));    
    if (this.authService.userCart[i].quantity == 1) {
      this.authService.userCart.splice(i, 1);
    }
    else {
      this.authService.userCart[i].quantity--;
    }

    this.cartService.removeProductFromCart(i);
  }

  completeOnlineOrder(): void{
    alert("Order was completed!");
    this.cartService.completeOrder();
  }

  ngOnDestroy(): void {
    if(this.cartSubscription){
      this.cartSubscription.unsubscribe(); 
    }
  }

}
