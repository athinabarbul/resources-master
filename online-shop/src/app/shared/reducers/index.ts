import {
    ActionReducerMap,
    createSelector,
    MetaReducer
  } from "@ngrx/store";
  
  import { environment } from "../../../environments/environment";
  import * as fromProducts from "./products.reducer";
  import * as fromProduct from "./product.reducer";
  import * as fromCart from "./cart.reducer";
 
  
  export interface AppState {
    data: fromProducts.ProductsState;
    cartData: fromCart.CartState;
    productData: fromProduct.ProductState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    data: fromProducts.reducer,
    cartData: fromCart.reducerCart,
    productData: fromProduct.reducerProduct,
  };
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? []
    : [];
  
  export const getProductsState = (state: AppState) => state.data;
  export const getCartState = (cartState: AppState) => cartState.cartData;
  export const getProductState = (productState: AppState) => productState.productData;

  export const getAllItems = createSelector(
    getProductsState,
    fromProducts.getItems
  );

  export const getAllCartItems = createSelector(
    getCartState,
    fromCart.getCartItems 
  );

  export const getProductItem = createSelector(
    getProductState,
    fromProduct.getProduct 
  );
