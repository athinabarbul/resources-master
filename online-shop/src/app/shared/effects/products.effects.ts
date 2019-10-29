import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { ProductService } from 'src/app/data/service/product-service/product.service';
import * as ProductsActions from "../actions/products.actions";
import { ProductModel } from 'src/app/data/schema/product-model';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class ProductsEffect {
  constructor(private actions: Actions, private productService: ProductService) {}

  @Effect()
  loadData$ = this.actions.pipe(
    ofType(ProductsActions.ActionTypes.LoadDataBegin),
    switchMap(() => {
      return this.productService.getProducts().pipe(
        map(data => new ProductsActions.LoadDataSuccess({ data: data })),
        catchError(error =>
          of(new ProductsActions.LoadDataFailure({ error: error }))
        )
      );
    })
  );

  @Effect()
  addProduct$ = this.actions.pipe(
    ofType(ProductsActions.ActionTypes.AddNewProductBegin),
    switchMap(() => {
      return this.productService.addProduct().pipe(
        map(data => new ProductsActions.AddNewProductSuccess( this.productService.newProduct )),
        catchError(error =>
          of(new ProductsActions.AddNewProductFailure({ error: error }))
        )
      );
    })
  );

  @Effect()
  deleteProduct$ = this.actions.pipe(
    ofType(ProductsActions.ActionTypes.DeleteProductBegin),
    switchMap(() => {
      return this.productService.deleteProduct().pipe(
        map(data => new ProductsActions.DeleteProductSuccess( this.productService.deleteProductIndex )),
        catchError(error =>
          of(new ProductsActions.DeleteProductFailure({ error: error }))
        )
      );
    })
  ); 
  
  @Effect()
  updateProduct$ = this.actions.pipe(
    ofType(ProductsActions.ActionTypes.UpdateProductBegin),
    switchMap(() => {
      return this.productService.updateProduct().pipe(
        map(data => new ProductsActions.UpdateProductSuccess( {index: this.productService.updatedProduct.id, product: this.productService.updatedProduct} )),
        catchError(error =>
          of(new ProductsActions.UpdateProductFailure({ error: error }))
        )
      );
    })
  );  

}