import { reducer, initialState } from "./products.reducer";
import { AddNewProduct, UpdateProduct, LoadDataBegin, LoadDataSuccess, LoadDataFailure, DeleteProduct } from '../actions/products.actions';
import { ProductModel } from 'src/app/data/schema/product-model';

describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = reducer(undefined, action);
  
      expect(result).toBe(initialState);
    });
  });

  describe('reducer', () => {
    describe('[ProductNew] Adding new product', () => {
      let mockProduct = new ProductModel(1,
            "Notebook Basic 17", "Laptops", 1248, "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
            "Laptop");

      it('should add a product to state', () => {
        const action = new AddNewProduct( mockProduct );
        const result = reducer(initialState, action);
  
        expect(result).toEqual({
          items: [action.payload],
          error: null,
          loading: null
        });
      });
    });

    describe('[ProductsLoad] Load data begin products', () => {
        it('should toggle loading state', () => {
          const action = new LoadDataBegin();
          const result = reducer(initialState, action);
      
          expect(result).toEqual({
            ...initialState,
            error: null,
            loading: true
          });
        });
      });

      describe('[ProductsLoad] Load data success products', () => {
        it('should load a user to state', () => {
          const mockProductLoad = {
            "id":1,
            "name":"Notebook Basic 17",
            "category":"Laptops",
            "image":"https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
            "price":1249,
            "description":"Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
          }
          const action = new LoadDataSuccess({ data: mockProductLoad });
          const result = reducer(initialState, action);
      
          expect(result).toEqual({
            ...initialState,
            loading: false,
            items: action.payload.data
          });
        });
      });

      describe('[ProductsLoad] Load data failure products', () => {
        it('should update error in state', () => {
          const error = new Error();
          const action = new LoadDataFailure({ error });
          const result = reducer(initialState, action);
      
          expect(result).toEqual({
            ...initialState,
            error,
            loading: false
          });
        });
      });

      describe('[UpdateProduct] Updating product', () => {

        let mockIndex = 1;
        let mockProduct = new ProductModel(1,
            "Notebook Basic 17", "Laptops", 1248, "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
            "Laptop");

        it('should update a product from state', () => {
          const action = new UpdateProduct( {index: mockIndex, product: mockProduct} );
          const product = initialState[action.payload.index];
          const updatedProduct ={
            ...product,
            ...action.payload.product
          };
          const updatedProductList = [...initialState.items];
          updatedProductList[action.payload.index] = updatedProduct;
          const result = reducer(initialState, action);
    
          expect(result).toEqual({
            ...initialState,
            items: updatedProductList
          });
        });
      });

      describe('[DeleteProduct] Deleting product', () => {
        let mockIndex = 1;

        it('should delete a product from the state', () => {
          const action = new DeleteProduct( mockIndex );
          const result = reducer(initialState, action);
    
          expect(result).toEqual({
            ...initialState,
            items: initialState.items.splice(mockIndex,1)
          });
        });
      });
  });