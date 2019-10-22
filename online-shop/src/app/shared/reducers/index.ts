import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from "@ngrx/store";
  import { environment } from "../../../environments/environment";
  
  import * as fromProducts from "./products.reducer";
  import * as fromCart from "./cart.reducer";
  
  export interface AppState {
    data: fromProducts.ProductState;
    cartData: fromCart.CartState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    data: fromProducts.reducer,
    cartData: fromCart.reducerCart
  };
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? []
    : [];
  
  export const getProductsState = (state: AppState) => state.data;
  export const getCartState = (cartState: AppState) => cartState.cartData;

  export const getAllItems = createSelector(
    getProductsState,
    fromProducts.getItems
  );

  export const getAllCartItems = createSelector(
    getCartState,
    fromCart.getCartItems 
  );