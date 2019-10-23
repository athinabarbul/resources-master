import { Action } from "@ngrx/store";
import { CartItemModel } from 'src/app/data/schema/cart-item-model';

export enum ActionTypes {
  LoadDataBegin =   "[CartLoad] Load data begin",
  LoadDataSuccess = "[CartLoad] Load data success",
  LoadDataFailure = "[CartLoad] Load data failure",
  AddNewCartProduct = "[AddNewCartProduct] Add new cart item"
}

export class LoadDataBegin implements Action {
  readonly type = ActionTypes.LoadDataBegin;
}

export class LoadDataSuccess implements Action {
  readonly type = ActionTypes.LoadDataSuccess;

  constructor(public payload: { data: any }) {}
}

export class LoadDataFailure implements Action {
  readonly type = ActionTypes.LoadDataFailure;

  constructor(public payload: { error: any }) {}
}

export class AddNewCartProduct implements Action{
  readonly type = ActionTypes.AddNewCartProduct;
  constructor(public payload: CartItemModel){}
}

export type ActionsUnion = LoadDataBegin | LoadDataSuccess | LoadDataFailure | AddNewCartProduct;