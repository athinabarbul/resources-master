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

  listOfCartItems: CartItemModel[];
  cartItemsList$: Observable<CartItemModel[]>;


  constructor(private http: HttpClient) {
    this.cartItemsList$ = this.getProductsOrder();
    this.cartItemsList$.subscribe((data) => {this.listOfCartItems = data;});
  }


  addProductToCart(product: ProductModel): void {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    if (this.listOfCartItems.length === 0) {
      this.listOfCartItems.push(new CartItemModel(product.id, product.name, product.category, product.price, product.description, product.image, 1));

      this.http.post('http://localhost:3000/cartItems',
        {
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "price": product.price,
            "image": product.image,
            "description": product.description,
            "quantity": 1
        },
        { headers })
        .subscribe(
          val => {
            console.log("POST call successful value returned in body",
              val);
          },
          response => {
            console.log("POST call in error", response);
          },
          () => {
            console.log("The PUT observable is now completed.");
          }
        );
    }
    else {
      let flag = false;
      for (let cartItem of this.listOfCartItems) {
        if (cartItem.id == product.id) {
          cartItem.quantity++;
          flag = true;

          this.http.put('http://localhost:3000/cartItems/' + product.id,
            {
                "id": product.id,
                "name": product.name,
                "category": product.category,
                "price": product.price,
                "image": product.image,
                "description": product.description,
                "quantity": cartItem.quantity
            },
            { headers })
            .subscribe(
              val => {
                console.log("POST call successful value returned in body",
                  val);
              },
              response => {
                console.log("POST call in error", response);
              },
              () => {
                console.log("The PUT observable is now completed.");
              }
            );

          break;
        }
      }
      if (flag === false) {
        this.listOfCartItems.push(new CartItemModel(product.id, product.name, product.category, product.price, product.description, product.image, 1));

        this.http.post('http://localhost:3000/cartItems',
          {
              "id": product.id,
              "name": product.name,
              "category": product.category,
              "price": product.price,
              "image": product.image,
              "description": product.description,
              "quantity": 1
          },
          { headers })
          .subscribe(
            val => {
              console.log("POST call successful value returned in body",
                val);
            },
            response => {
              console.log("POST call in error", response);
            },
            () => {
              console.log("The PUT observable is now completed.");
            }
          );
      }
    }


      //
      // const headers = new HttpHeaders()
      //   .set("Content-Type", "application/json");
      //
      // this.http.post('http://localhost:3000/cartItems',
      //   {
      //
      //       "id": item.id,
      //       "name": item.name,
      //       "category": item.category,
      //       "price": item.price,
      //       "image": item.image,
      //       "description": item.description,
      //       "quantity": item.quantity
      //   },
      //   { headers })
      //   .subscribe(
      //     val => {
      //       console.log("PUT call successful value returned in body",
      //         val);
      //     },
      //     response => {
      //       console.log("PUT call in error", response);
      //     },
      //     () => {
      //       console.log("The PUT observable is now completed.");
      //     }
      //   );
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
    return this.http.get<CartItemModel[]>('http://localhost:3000/cartItems').map(data => _.values(data));

  }

}
