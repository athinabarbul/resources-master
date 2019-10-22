import { Action } from "@ngrx/store";

export enum ActionTypes {
  LoadDataBegin =   "[CartLoad] Load data begin",
  LoadDataSuccess = "[CartLoad] Load data success",
  LoadDataFailure = "[CartLoad] Load data failure"
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

export type ActionsUnion = LoadDataBegin | LoadDataSuccess | LoadDataFailure;