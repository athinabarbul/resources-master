import { Action } from "@ngrx/store";
import { ProductModel } from 'src/app/data/schema/product-model';

export enum ActionTypes {
  LoadDataBegin = "[ProductsLoad] Load data begin",
  LoadDataSuccess = "[ProductsLoad] Load data success",
  LoadDataFailure = "[ProductsLoad] Load data failure",
  AddNewProduct = "[ProductNew] Adding new product"
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

export class AddNewProduct implements Action{
  readonly type = ActionTypes.AddNewProduct;
  constructor(public payload: ProductModel){}
}

export type ActionsUnion = LoadDataBegin | LoadDataSuccess | LoadDataFailure | AddNewProduct;