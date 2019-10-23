import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ProductService } from 'src/app/data/service/product-service/product.service';
import * as ProductActions from "../actions/product.actions";
import { ProductModel } from 'src/app/data/schema/product-model';

@Injectable()
export class ProductEffect {
  constructor(private actions: Actions, private productService: ProductService) {}

  @Effect()
  loadProductData = this.actions.pipe(
    ofType(ProductActions.ActionTypes.LoadProductDataBegin),
    switchMap(() => {
      return this.productService.getProductById().pipe(
        map(data => new ProductActions.LoadProductDataSuccess({ data: data })),
        catchError(error =>
          of(new ProductActions.LoadProductDataFailure({ error: error }))
        )
      );
    })
    
  );

}