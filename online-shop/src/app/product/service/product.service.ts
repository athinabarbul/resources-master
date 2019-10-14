import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProductModel } from '../product-model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listOfProducts: ProductModel[] = [];

  constructor(private http: HttpClient) {

    this.getJSON().subscribe(data => {
            console.log(data);
            for( let key in data){
              this.listOfProducts.push(data[key]);
            }
        });
  }

  public getJSON(): Observable<any> {
        return this.http.get('http://localhost:4200/assets/products.json');
    }

  getProducts(): ProductModel[]{
    return this.listOfProducts;
  }

  getProductById(id: number): ProductModel{
      for (let product of this.listOfProducts){
        if (product.id === id)
          return product;
      }
      return undefined;
  }

}
