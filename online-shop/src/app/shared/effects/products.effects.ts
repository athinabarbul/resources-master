import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ProductService } from 'src/app/data/service/product.service';
import * as ProductsActions from "../actions/products.actions";

@Injectable()
export class ProductsEffect {
  constructor(private actions: Actions, private productService: ProductService) {}

  @Effect()
  loadData = this.actions.pipe(
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
}