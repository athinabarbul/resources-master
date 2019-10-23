import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do'
import { Store } from "@ngrx/store";
import { ProductModel } from '../../schema/product-model';

import * as ProductsActions from "../../../shared/actions/products.actions";
import { AppState, getAllItems, getProductsState } from "../../../shared/reducers";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  newProduct: ProductModel;
  lastId: number;

  constructor(private store: Store<AppState>, private http: HttpClient) {
  }

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:3000/products');
  }

  public getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>('http://localhost:3000/products/' + id);
  }

  public addProduct(): void {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
      
     this.http.post<ProductModel>('http://localhost:3000/products',{
      "id": this.newProduct.id,
      "name": this.newProduct.name,
      "category": this.newProduct.category,
      "image": this.newProduct.image,
      "price": this.newProduct.price,
      "description": this.newProduct.description
    },
    { headers }).subscribe(
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

  }

  load() {
    this.store.dispatch(new ProductsActions.LoadDataBegin());
  }

  getData() {
    return this.store.select(getProductsState);
  }

  getItems() {
    return this.store.select(getAllItems);
  }
}
