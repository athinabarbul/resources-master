import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do'


import { ProductModel } from '../product-model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:3000/products').map(data => _.values(data));
  }

  public getSpecificProduct(i:number): Observable<ProductModel> {
    return this.http.get<ProductModel>('http://localhost:3000/products/' + i).map(data => _.values(data)).do(console.log);
  }

}
