import { Injectable } from '@angular/core';
import { CartItemModel } from '../schema/cart-item-model'
import { ProductModel } from '../schema/product-model'
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';
import { UserModel } from '../schema/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userDetails: UserModel;
  userList$: Observable<UserModel>;
  listOfCartItems: CartItemModel[];
  
  constructor(private http: HttpClient, private router: Router) {
    this.userList$ = this.getProductsOrder();
    this.userList$.subscribe((data) => { this.userDetails = data;
    this.listOfCartItems = this.userDetails.cart; });
  }

  addProductToCart(product: ProductModel): void {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    
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

    let cart = this.listOfCartItems;
      
      this.http.patch('http://localhost:3000/users/' + 'doej',
      {
        cart
      },
      { headers })
      .subscribe(
        val => {
          this.userList$.subscribe((data) => { this.userDetails = data;
            this.listOfCartItems = this.userDetails.cart; });
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

  removeProductFromCart(i: number): void {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    if (this.listOfCartItems[i].quantity == 1) {
      this.listOfCartItems.splice(i, 1);
    }
    else {
      this.listOfCartItems[i].quantity--;
    }

    let cart = this.listOfCartItems;
      
      this.http.patch('http://localhost:3000/users/' + 'doej',
      {
        cart
      },
      { headers })
      .subscribe(
        val => {
          // this.router.navigate(['/shopping-cart']);
          this.listOfCartItems = <CartItemModel[]>(<UserModel>val).cart;
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

  mapProducts(): any[]{

    let products : any[] = [];

    for (let item of this.listOfCartItems){
        products.push({
          "productId": item.id,
          "quantity": item.quantity
        });
    }

    return products;
  }

  completeOrder(): void {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let orderedItems = this.mapProducts();

    console.log(orderedItems);

    this.http.post('http://localhost:3000/orders',
      {
        "customer": "doej",
        "products": orderedItems
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
          console.log("The POST observable is now completed.");
        }
      );
     

      this.listOfCartItems = [];

      let cart = this.listOfCartItems;
      
      this.http.patch('http://localhost:3000/users/' + 'doej',
      {
        cart
      },
      { headers })
      .subscribe(
        val => {
          this.router.navigate(['/shopping-cart']);
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

  public getProductsOrder(): Observable<UserModel> {
    return this.http.get<UserModel>('http://localhost:3000/users/' + 'doej');

  }

}
