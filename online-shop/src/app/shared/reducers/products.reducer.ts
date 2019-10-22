import * as fromProduct from "../actions/products.actions";
import { ProductModel } from 'src/app/data/schema/product-model';

export interface ProductState {
    items: ProductModel[];
    loading: boolean;
    error: any;
  }

export const initialState: ProductState = {
    items: [],
    loading: false,
    error: null
  };
  
  export function reducer(
    state = initialState,
    action: fromProduct.ActionsUnion
  ): ProductState {
    switch (action.type) {
      case fromProduct.ActionTypes.LoadDataBegin: {
        return {
          ...state,
          loading: true,
          error: null
        };
      }
  
      case fromProduct.ActionTypes.LoadDataSuccess: {
        return {
          ...state,
          loading: false,
          items: action.payload.data
        };
      }
  
      case fromProduct.ActionTypes.LoadDataFailure: {
        return {
          ...state,
          loading: false,
          error: action.payload.error
        };
      }

      case fromProduct.ActionTypes.AddNewProduct:
        return{
          ...state,
          loading:null,
          items: [...state.items, action.payload]
        };

  
      default: {
        return state;
      }
    }
  }
  
  export const getItems = (state: ProductState) => state.items;
