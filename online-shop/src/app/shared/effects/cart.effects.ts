import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";

import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { AuthService } from 'src/app/data/service/auth-service/auth.service';
import * as CartActions from "../actions/cart.actions";

@Injectable()
export class CartEffects {
  constructor(private actions: Actions, private authService: AuthService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType(CartActions.ActionTypes.LoadDataBegin),
    switchMap(() => {
      return this.authService.getCurrentUserDetails().pipe(
        map(data => new CartActions.LoadDataSuccess({ data: data.cart })),
        catchError(error =>
          of(new CartActions.LoadDataFailure({ error: error }))
        )
      );
    })
  );
} 