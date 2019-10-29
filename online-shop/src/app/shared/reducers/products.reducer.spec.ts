import { reducer, initialState } from "./products.reducer";
import { AddNewProductSuccess, LoadDataBegin, LoadDataSuccess, LoadDataFailure, DeleteProductSuccess, AddNewProductBegin, AddNewProductFailure, DeleteProductFailure, DeleteProductBegin, UpdateProductSuccess, UpdateProductFailure, UpdateProductBegin } from '../actions/products.actions';
import { ProductModel } from 'src/app/data/schema/product-model';


  describe('ProductsReducer', () => {

    describe('default state', () => {
      it('should return the default state', () => {
        const action = { type: 'NOOP' } as any;
        const result = reducer(undefined, action);
    
        expect(result).toBe(initialState);
      });
    });

    describe('[ProductNew] Adding new product', () => {
      it('should toggle add new product state', () => {
        const action = new AddNewProductBegin();
        const result = reducer(initialState, action);
    
        expect(result).toEqual({
          ...initialState,
          error: null,
          loading: true
        });
      });
    });

    describe('[ProductNew] Adding new product success', () => {
      let mockProduct = new ProductModel(1,
            "Notebook Basic 17", "Laptops", 1248, "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
            "Laptop");

      it('should add a product to state', () => {
        const action = new AddNewProductSuccess( mockProduct );
        const result = reducer(initialState, action);
  
        expect(result).toEqual({
          items: [action.payload],
          error: null,
          loading: null
        });
      });
    });

    describe('[ProductNew] Adding new product failure', () => {
      it('should update error in state', () => {
        const error = new Error();
        const action = new AddNewProductFailure({ error });
        const result = reducer(initialState, action);
    
        expect(result).toEqual({
          ...initialState,
          error,
          loading: false
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
        it('should toggle updating state', () => {
          const action = new UpdateProductBegin();
          const result = reducer(initialState, action);
      
          expect(result).toEqual({
            ...initialState,
            error: null,
            loading: true
          });
        });
      });

      describe('[UpdateProduct] Updating product', () => {

        let mockIndex = 1;
        let mockProduct = new ProductModel(1,
            "Notebook Basic 17", "Laptops", 1248, "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
            "Laptop");

        it('should update a product from state', () => {
          const action = new UpdateProductSuccess( {index: mockIndex, product: mockProduct} );
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

        describe('[UpdateProduct] Updating product failure', () => {
          it('should update error in state', () => {
            const error = new Error();
            const action = new UpdateProductFailure({ error });
            const result = reducer(initialState, action);
        
            expect(result).toEqual({
              ...initialState,
              error,
              loading: false
            });
          });
        });
      });



      describe('[DeleteProduct] Deleting product', () => {
        let mockIndex = 1;

        describe('[DeleteProduct] Deleting product begin', () => {
          it('should toggle delete product state', () => {
            const action = new DeleteProductBegin();
            const result = reducer(initialState, action);
        
            expect(result).toEqual({
              ...initialState,
              error: null,
              loading: true
            });
          });
        });

        it('should delete a product from the state', () => {
          const action = new DeleteProductSuccess( mockIndex );
          const result = reducer(initialState, action);
    
          expect(result).toEqual({
            ...initialState,
            items: initialState.items.splice(mockIndex,1)
          });
        });
      });

      describe('[DeleteProduct] Deleting product failure', () => {
        it('should update error in state', () => {
          const error = new Error();
          const action = new DeleteProductFailure({ error });
          const result = reducer(initialState, action);
      
          expect(result).toEqual({
            ...initialState,
            error,
            loading: false
          });
        });
      });

  });