import { Injectable } from '@angular/core';
import { CartItemModel } from '../cart-item-model'
import { ProductModel } from '../../product/product-model'
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  listOfCartItems: CartItemModel[] = [];

  constructor(private http: HttpClient) { }

  getCartItemList(): CartItemModel[] {
    return this.listOfCartItems;
  }

  addProductToCart(product: ProductModel): void {

    if (this.listOfCartItems.length === 0) {
      this.listOfCartItems.push(new CartItemModel(product.id, product.name, product.category, product.price, product.description, product.image, 1));
    }
    else {
      let flag = false;
      for (let cartItem of this.listOfCartItems) {
        if (cartItem.id == product.id) {
          cartItem.quantity++;
          flag = true;
          break;
        }
      }
      if (flag === false) {
        this.listOfCartItems.push(new CartItemModel(product.id, product.name, product.category, product.price, product.description, product.image, 1));
      }
    }

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

      this.http.patch('http://localhost:3000/0',
      {
            "id":product.id,
            "name":product.name,
            "category":product.category,
            "image":product.image,
            "price":product.price,
            "description":product.description,
            "quantity":1
      },
      { headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );


  }

  removeProductFromCart(i: number): void {
    // if( this.listOfCartItems[i].quantity == 1){
    //   this.listOfCartItems.splice(i,1);
    // }
    // else{
    //   this.listOfCartItems[i].quantity--;
    // }
  }

  public getProductsOrder(): Observable<CartItemModel[]> {
    return this.http.get<CartItemModel[]>('http://localhost:3000/').map(data => _.values(data));

  }

}
