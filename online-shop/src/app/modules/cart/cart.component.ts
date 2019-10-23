import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItemModel } from '../../data/schema/cart-item-model'
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../data/service/cart-service/cart.service'
import { Subscription } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartListObservable$: Observable<CartItemModel[]>;
  cartList: CartItemModel[];
  cartSubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit() {

    this.cartListObservable$ = this.cartService.getCartItems();

    this.cartSubscription = this.cartListObservable$.subscribe( data => {
      this.cartList = data;
    })
  }

  removeCartItem(i:number) : void{
    
    if (this.cartList[i].quantity == 1) {
      this.cartList.splice(i, 1);
    }
    else {
      this.cartList[i].quantity--;
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
