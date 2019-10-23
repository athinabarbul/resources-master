import * as fromProduct from "../actions/product.actions";
import { ProductModel } from 'src/app/data/schema/product-model';


export interface ProductState {
    item: ProductModel;
    loading: boolean;
    error: any;
  }

export const initialState: ProductState = {
    item: undefined,
    loading: false,
    error: null
  };
  
  export function reducerProduct(
    state = initialState,
    action: fromProduct.ActionsUnion
  ): ProductState {
    switch (action.type) {
      case fromProduct.ActionTypes.LoadProductDataBegin: {
        return {
          ...state,
          loading: true,
          error: null
        };
      }
  
      case fromProduct.ActionTypes.LoadProductDataSuccess: {
        return {
          ...state,
          loading: false,
          item: action.payload.data
        };
      }
  
      case fromProduct.ActionTypes.LoadProductDataFailure: {
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      }

      
      default: {
        return state;
      }
    }
  }
  
  export const getProduct = (state: ProductState) => state.item;
