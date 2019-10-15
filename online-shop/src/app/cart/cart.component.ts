import { Component, OnInit } from '@angular/core';
import { CartItemModel } from './cart-item-model'
import { Observable } from 'rxjs/Observable';
import { CartService } from './service/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  listOfCartItems$: Observable<CartItemModel[]>;

  cartList: CartItemModel[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.listOfCartItems$ = this.cartService.getProductsOrder();

    this.listOfCartItems$.subscribe((data)  => {
    this.cartList = data;
   });

  }

  removeCartItem(i:number) : void{
    console.log(i);
    this.cartService.removeProductFromCart(i);
  }

  completeOnlineOrder(): void{
    alert("Order was completed!");
    this.cartService.completeOrder();
  }

}
