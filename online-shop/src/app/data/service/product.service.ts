import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do'
import { Store } from "@ngrx/store";
import { ProductModel } from '../schema/product-model';

import * as ProductsActions from "../../shared/actions/products.actions";
import { AppState, getAllItems, getProductsState } from "../../shared/reducers";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private store: Store<AppState>, private http: HttpClient) {
  }

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:3000/products');
  }

  public getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>('http://localhost:3000/products/' + id);
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
