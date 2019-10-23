import { Injectable } from '@angular/core';
import { CartItemModel } from '../../schema/cart-item-model'
import { ProductModel } from '../../schema/product-model'
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';
import { UserModel } from '../../schema/user';
import { AuthService } from '../auth-service/auth.service';


import { Store } from "@ngrx/store";
import * as CartActions from "../../../shared/actions/cart.actions";
import { AppState, getAllCartItems, getCartState } from "../../../shared/reducers";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userDetails: UserModel;
  userList$: Observable<UserModel>;
  newCartItem: CartItemModel;
  
  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService, private store: Store<AppState>) {
    this.userList$ = this.getProductsOrder();
    this.userList$.subscribe((data) => { this.userDetails = data;
    });
    
  }

  addProductToCart(product: ProductModel): void {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    
    if (this.authService.userCart.length === 0) {
      this.authService.userCart.push(new CartItemModel(product.id, product.name, product.category, product.price, product.description, product.image, 1));
    }
    else {
      let flag = false;
      for (let cartItem of this.authService.userCart) {
        if (cartItem.id == product.id) {
          cartItem.quantity++;
          flag = true;
          break;
        }

      }
      if (flag === false) {
        this.authService.userCart.push(new CartItemModel(product.id, product.name, product.category, product.price, product.description, product.image, 1));
      }
    }

    let cart = this.authService.userCart;
      
      this.http.patch('http://localhost:3000/users/' + this.authService.userLoggedIn,
      {
        cart
      },
      { headers })
      .subscribe(
        val => {
          this.userList$.subscribe((data) => { this.userDetails = data;
            this.authService.userCart = this.userDetails.cart; });
          this.loadCartItems();
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

      this.authService.userCart = this.authService.userCart;  

    if (this.authService.userCart[i].quantity == 1) {
      this.authService.userCart.splice(i, 1);
    }
    else {
      this.authService.userCart[i].quantity--;
    }

    let cart = this.authService.userCart;
      
      this.http.patch('http://localhost:3000/users/' + this.authService.userLoggedIn,
      {
        cart
      },
      { headers })
      .subscribe(
        val => {
          this.loadCartItems();
          this.authService.userCart = <CartItemModel[]>(<UserModel>val).cart;
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

    this.authService.userCart = this.authService.userCart;

    let products : any[] = [];

    for (let item of this.authService.userCart){
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
    this.authService.userCart = this.authService.userCart;

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
     

      this.authService.userCart = [];

      let cart = this.authService.userCart;
      
      this.http.patch('http://localhost:3000/users/' + this.authService.userLoggedIn,
      {
        cart
      },
      { headers })
      .subscribe(
        val => {
          this.loadCartItems();
          this.router.navigate(['/product-list']);
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
    return this.http.get<UserModel>('http://localhost:3000/users/' + this.authService.userLoggedIn);

  }

  loadCartItems() {
    this.store.dispatch(new CartActions.LoadDataBegin());
  }

  getDataFromCart() {
    return this.store.select(getCartState);
  }

  getCartItems() {
    return this.store.select(getAllCartItems);
  }

}
