import { Injectable } from '@angular/core';
import { CartItemModel } from '../schema/cart-item-model'
import { ProductModel } from '../schema/product-model'
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  listOfCartItems: CartItemModel[];
  cartItemsList$: Observable<CartItemModel[]>;


  constructor(private http: HttpClient, private router: Router) {
    this.cartItemsList$ = this.getProductsOrder();
    this.cartItemsList$.subscribe((data) => { this.listOfCartItems = data; });
  }


  addProductToCart(product: ProductModel): void {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    if (this.listOfCartItems.length === 0) {
      this.listOfCartItems.push(new CartItemModel(product.id, product.name, product.category, product.price, product.description, product.image, 1));

      this.http.post('http://localhost:3001/cartItems',
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

          this.http.put('http://localhost:3001/cartItems/' + product.id,
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

        this.http.post('http://localhost:3001/cartItems',
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

    console.log("Cart item " + this.listOfCartItems);

  }

  removeProductFromCart(i: number): void {

    console.log(this.listOfCartItems[i].id);

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    if (this.listOfCartItems[i].quantity == 1) {
      console.log(this.listOfCartItems[i]);
      this.http.delete('http://localhost:3001/cartItems/' + this.listOfCartItems[i].id).subscribe(response => {
        console.log("deleted");
        this.router.navigate(['/product-list']);
      }, (error) => {
        console.log("nono deleted");
      });
      this.listOfCartItems.splice(i, 1);
    }
    else {
      this.listOfCartItems[i].quantity--;
      this.http.patch('http://localhost:3001/cartItems/' + this.listOfCartItems[i].id,
        {
          "quantity": this.listOfCartItems[i].quantity
        },
        { headers })
        .subscribe(
          val => {
            console.log("patch call successful value returned in body",
              val);
            this.router.navigate(['/shopping-cart']);
          },
          response => {
            console.log("patch call in error", response);
          },
          () => {
            console.log("The patch observable is now completed.");
          }
        );
    }
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
     

    for (let item of this.listOfCartItems) {
      this.http.delete('http://localhost:3001/cartItems/' + item.id).subscribe(response => {
        console.log("deleted");
        this.listOfCartItems = [];
      }, (error) => {
        console.log("nono deleted");
      });

    }

  }

  public getProductsOrder(): Observable<CartItemModel[]> {
    return this.http.get<CartItemModel[]>('http://localhost:3001/cartItems').map(data => _.values(data)).do(console.log);

  }

}
