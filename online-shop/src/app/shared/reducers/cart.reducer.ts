import * as fromCart from "../actions/cart.actions";
import { CartItemModel } from 'src/app/data/schema/cart-item-model';

export interface CartState {
    items: CartItemModel[];
    loading: boolean;
    error: any;
  }

export const initialState: CartState = {
    items: [],
    loading: false,
    error: null
  };

  export function reducerCart(
    state = initialState,
    action: fromCart.ActionsUnion
  ): CartState {
    switch (action.type) {
      case fromCart.ActionTypes.LoadDataBegin: {
        console.log("BEGIN");
        return {
          ...state,
          loading: true,
          error: null
        };
      }
  
      case fromCart.ActionTypes.LoadDataSuccess: {
        console.log("SUCCESS");
        return {
          ...state,
          loading: false,
          items: action.payload.data
        };
      }
  
      case fromCart.ActionTypes.LoadDataFailure: {
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
  
  export const getCartItems = (state: CartState) => state.items;
