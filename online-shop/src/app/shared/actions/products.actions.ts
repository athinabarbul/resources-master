import { Action } from "@ngrx/store";
import { ProductModel } from 'src/app/data/schema/product-model';

export enum ActionTypes {
  LoadDataBegin = "[ProductsLoad] Load data begin products",
  LoadDataSuccess = "[ProductsLoad] Load data success products",
  LoadDataFailure = "[ProductsLoad] Load data failure products",
  AddNewProductBegin = "[ProductNew] Adding new product",
  AddNewProductSuccess = "[ProductNew] Adding new product success",
  AddNewProductFailure = "[ProductNew] Adding new product failure",
  DeleteProductBegin = "[DeleteProduct] Deleting product begin",
  DeleteProductSuccess = "[DeleteProduct] Deleting product success",
  DeleteProductFailure = "[DeleteProduct] Deleting product failure",
  UpdateProductBegin = "[UpdateProduct] Updating product",
  UpdateProductSuccess = "[UpdateProduct] Updating product success",
  UpdateProductFailure = "[UpdateProduct] Updating product failure"


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

export class UpdateProductBegin implements Action {
  readonly type = ActionTypes.UpdateProductBegin;
}

export class UpdateProductSuccess implements Action{
  readonly type = ActionTypes.UpdateProductSuccess;
  constructor(public payload: {index: number, product: ProductModel}) {}
}

export class UpdateProductFailure implements Action {
  readonly type = ActionTypes.UpdateProductFailure;

  constructor(public payload: { error: any }) {}
}

export class DeleteProductBegin implements Action {
  readonly type = ActionTypes.DeleteProductBegin;
}

export class DeleteProductSuccess implements Action{
  readonly type = ActionTypes.DeleteProductSuccess;
  constructor(public payload:  number) {}
}

export class DeleteProductFailure implements Action {
  readonly type = ActionTypes.DeleteProductFailure;

  constructor(public payload: { error: any }) {}
}

export type ActionsUnion = LoadDataBegin | 
LoadDataSuccess | 
LoadDataFailure | 
AddNewProductSuccess | 
AddNewProductBegin | 
AddNewProductFailure | 
UpdateProductBegin |
UpdateProductSuccess | 
UpdateProductFailure |
DeleteProductBegin |
DeleteProductSuccess |
DeleteProductFailure;