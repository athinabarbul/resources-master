import * as fromProduct from "../actions/products.actions";
import { ProductModel } from 'src/app/data/schema/product-model';


export interface ProductsState {
    items: ProductModel[];
    loading: boolean;
    error: any;
  }

export const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null
  };
  
  export function reducer(
    state = initialState,
    action: fromProduct.ActionsUnion
  ): ProductsState {
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

      case fromProduct.ActionTypes.AddNewProductBegin: {
        return {
          ...state,
          loading: true,
          error: null
        };
      }

      case fromProduct.ActionTypes.AddNewProductSuccess:
        return{
          ...state,
          loading:null,
          items: [...state.items, action.payload]
        };

        case fromProduct.ActionTypes.AddNewProductFailure: {
          return {
            ...state,
            loading: false,
            error: action.payload.error
          };
        }

        case fromProduct.ActionTypes.UpdateProductBegin: {
          return {
            ...state,
            loading: true,
            error: null
          };
        }

        case fromProduct.ActionTypes.UpdateProductSuccess:
           const product = state.items[action.payload.index];
           const updatedProduct ={
             ...product,
             ...action.payload.product
           };
           const updatedProductList = [...state.items];
           updatedProductList[action.payload.index] = updatedProduct;

           return{
             ...state,
             items: updatedProductList
           };

           case fromProduct.ActionTypes.UpdateProductFailure: {
            return {
              ...state,
              loading: false,
              error: action.payload.error
            };
          }

        case fromProduct.ActionTypes.DeleteProductBegin: {
            return {
              ...state,
              loading: true,
              error: null
            };
          }

        case fromProduct.ActionTypes.DeleteProductSuccess:
          return {
            ...state,
            items: state.items.filter((ig, igIndex) => {
              return igIndex != action.payload;
            })
          }

        case fromProduct.ActionTypes.DeleteProductFailure: {
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
  
  export const getItems = (state: ProductsState) => state.items;
