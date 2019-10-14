import { Injectable } from '@angular/core';
import { CartItemModel } from '../cart-item-model'
import { ProductModel } from '../../product/product-model'


@Injectable({
  providedIn: 'root'
})
export class CartService {

  listOfCartItems: CartItemModel[] = [];

  constructor() { }

  getCartItemList(): CartItemModel[] {
    return this.listOfCartItems;
  }

  addProductToCart(product: ProductModel): void{
    if ( this.listOfCartItems.length === 0 ){
      this.listOfCartItems.push(new CartItemModel(product, 1));
    }
    else{
      let flag = false;
      for( let cartItem of this.listOfCartItems){
        if ( cartItem.product.id == product.id ){
            cartItem.quantity++;
            flag = true;
            break;
        }
      }
      if(flag === false){
        this.listOfCartItems.push(new CartItemModel(product, 1));
      }
    }

  }

}
