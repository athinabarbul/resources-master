import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItemModel } from '../../data/schema/cart-item-model'
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../data/service/cart.service'
import { UserModel } from 'src/app/data/schema/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  user$: Observable<UserModel>;
  userDetails: UserModel;
  cartList: CartItemModel[];
  userSubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.user$ = this.cartService.getProductsOrder();
    this.userSubscription = this.user$.subscribe((data) => { this.userDetails = data;
      this.cartList = this.userDetails.cart; });
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
    if(this.userSubscription){
      this.userSubscription.unsubscribe(); 
    }
  }

}
