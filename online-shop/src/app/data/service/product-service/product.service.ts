import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do'

import { Store } from "@ngrx/store";

import { ProductModel } from '../../schema/product-model';
import * as ProductsActions from "../../../shared/actions/products.actions";
import * as ProductActions from "../../../shared/actions/product.actions";

import { AppState, getAllItems, getProductsState, getProductItem, getProductState } from "../../../shared/reducers";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  newProduct: ProductModel;
  updatedProduct: ProductModel;
  deletedProductId: number;
  deleteProductIndex: number;
  lastId: number;
  navigateToProductId: number;

  constructor(private store: Store<AppState>, private http: HttpClient) {
  }

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:3000/products');
  }

  public getProductById(): Observable<ProductModel> {
    return this.http.get<ProductModel>('http://localhost:3000/products/' + this.navigateToProductId);
  }

  public addProduct(): Observable<ProductModel> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
      
     return this.http.post<ProductModel>('http://localhost:3000/products',{
      "id": this.newProduct.id,
      "name": this.newProduct.name,
      "category": this.newProduct.category,
      "image": this.newProduct.image,
      "price": this.newProduct.price,
      "description": this.newProduct.description
    },
    { headers });  

  }

  public updateProduct(): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this.http.put('http://localhost:3000/products/' + this.updatedProduct.id,
      {
        "id": this.updatedProduct.id,
        "name":  this.updatedProduct.name,
        "category": this.updatedProduct.category,
        "price": this.updatedProduct.price,
        "image": this.updatedProduct.image,
        "description": this.updatedProduct.description
      },
      { headers });
  }

  deleteProduct(): Observable<any> {
    return this.http.delete('http://localhost:3000/products/' + this.deletedProductId);
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

  addNewProduct() {
    this.store.dispatch(new ProductsActions.AddNewProductBegin());
  }

  deleteDProduct() {
    this.store.dispatch(new ProductsActions.DeleteProductBegin());
  }

  updateSingleProduct(){
    this.store.dispatch(new ProductsActions.UpdateProductBegin());
  }


  loadSingleProduct() {
    this.store.dispatch(new ProductActions.LoadProductDataBegin());
  }

  getProductData() {
    return this.store.select(getProductState);
  }

  getSingleProductItem() {
    return this.store.select(getProductItem);
  }
}
