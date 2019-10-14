import { Component, OnInit } from '@angular/core';
import { CartItemModel } from './cart-item-model'

import { CartService } from './service/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  listOfCartItems: CartItemModel[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.listOfCartItems = this.cartService.getCartItemList();
  }

}
