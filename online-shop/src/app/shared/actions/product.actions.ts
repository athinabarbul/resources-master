import { Action } from "@ngrx/store";

export enum ActionTypes {
    LoadProductDataBegin = "[ProductsLoad] Load data begin product",
    LoadProductDataSuccess = "[ProductsLoad] Load data success product",
    LoadProductDataFailure = "[ProductsLoad] Load data failure product"
  }
  
  export class LoadProductDataBegin implements Action {
    readonly type = ActionTypes.LoadProductDataBegin;
  }
  
  export class LoadProductDataSuccess implements Action {
    readonly type = ActionTypes.LoadProductDataSuccess;
  
    constructor(public payload: { data: any }) {}
  }
  
  export class LoadProductDataFailure implements Action {
    readonly type = ActionTypes.LoadProductDataFailure;
  
    constructor(public payload: { error: any }) {}
  }

  export type ActionsUnion = LoadProductDataBegin | LoadProductDataSuccess | LoadProductDataFailure;