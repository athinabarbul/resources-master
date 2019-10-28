import { Action } from "@ngrx/store";
import { ProductModel } from 'src/app/data/schema/product-model';

export enum ActionTypes {
  LoadDataBegin = "[ProductsLoad] Load data begin products",
  LoadDataSuccess = "[ProductsLoad] Load data success products",
  LoadDataFailure = "[ProductsLoad] Load data failure products",
  AddNewProductBegin = "[ProductNew] Adding new product",
  AddNewProductSuccess = "[ProductNew] Adding new product success",
  AddNewProductFailure = "[ProductNew] Adding new product failure",
  DeleteProduct = "[DeleteProduct] Deleting product",
  UpdateProduct = "[UpdateProduct] Updating product"
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

export class AddNewProductBegin implements Action {
  readonly type = ActionTypes.AddNewProductBegin;
}

export class AddNewProductSuccess implements Action{
  readonly type = ActionTypes.AddNewProductSuccess;
  constructor(public payload: ProductModel){}
}

export class AddNewProductFailure implements Action {
  readonly type = ActionTypes.AddNewProductFailure;

  constructor(public payload: { error: any }) {}
}

export class UpdateProduct implements Action{
  readonly type = ActionTypes.UpdateProduct;
  constructor(public payload: {index: number, product: ProductModel}) {}
}

export class DeleteProduct implements Action{
  readonly type = ActionTypes.DeleteProduct;
  constructor(public payload:  number) {}
}

export type ActionsUnion = LoadDataBegin | LoadDataSuccess | LoadDataFailure | AddNewProductSuccess | AddNewProductBegin | AddNewProductFailure | UpdateProduct | DeleteProduct;