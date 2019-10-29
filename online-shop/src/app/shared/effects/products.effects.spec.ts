import { Observable, of } from "rxjs";
import { cold, hot } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { ProductsEffect } from './products.effects';
import { ProductService } from 'src/app/data/service/product-service/product.service';
import { ProductModel } from 'src/app/data/schema/product-model';
import { LoadDataBegin, LoadDataSuccess, LoadDataFailure, AddNewProductBegin, AddNewProductSuccess, AddNewProductFailure, DeleteProductBegin, DeleteProductSuccess, DeleteProductFailure, UpdateProductBegin, UpdateProductSuccess, UpdateProductFailure } from '../actions/products.actions';

describe('ProductsEffect', () => {
    let actions: Observable<any>;

    let effects: ProductsEffect;
    let productsService: jasmine.SpyObj<ProductService>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ProductsEffect,
          provideMockActions(() => actions),
          {
            provide: ProductService,
            useValue: {
              getProducts: jasmine.createSpy(),
              addProduct: jasmine.createSpy(),
              deleteProduct: jasmine.createSpy()
            }
          }
        ]
      });
  
      effects = TestBed.get(ProductsEffect);
      productsService = TestBed.get(ProductService);
    });
  
    describe('[ProductsLoad] Load data begin products', () => {
      
      it('should return a stream with product list loaded action', () => {
        const productsLoad: ProductModel = {       
            "id":1,
            "name":"Notebook Basic 17",
            "category":"Laptops",
            "image":"https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
            "price":1249,
            "description":"Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro" };

        const action = new LoadDataBegin();
        const outcome = new LoadDataSuccess({data: productsLoad});

        actions = hot('-a', { a: action });        

        const response = cold('-a|', { a: productsLoad });       
        productsService.getProducts.and.returnValue(response);        

        const expected = cold('--b', { b: outcome });
        expect(effects.loadData$).toBeObservable(expected);

      });
  
      it('should fail and return an action with the error', () => {
        const action = new LoadDataBegin();
        const error = new Error('some error') as any;
        const outcome = new LoadDataFailure({error});  
        
        actions = hot('-a|', { a: action });
        const response = cold('-#|', {}, error);
        productsService.getProducts.and.returnValue(response);
        
        const expected = cold('--(b|)', { b: outcome });
        expect(effects.loadData$).toBeObservable(expected);
      });
    });

    describe('[ProductNew] Adding new product', () => {
      
      it('should return a stream with a new product added to the list', () => {
        const newProduct: ProductModel = {       
            "id":51,
            "name":"Sony Vaio",
            "category":"Laptops",
            "image":"https://cdn.shopify.com/s/files/1/0225/2590/2923/products/vaio-s13-main-product-image-min_1000x.png?v=1562349830",
            "price":1249,
            "description":"Sony Vaio with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro" };

        const action = new AddNewProductBegin();
        const outcome = new AddNewProductSuccess( newProduct );

        actions = hot('-a', { a: action });        

        const response = cold('-a|', { a: newProduct });       
        productsService.addProduct.and.returnValue(response);        

        const expected = cold('--b', { b: outcome });
        expect(effects.addProduct$).toBeObservable(expected);

      });
  
      it('should fail and return an action with the error', () => {
        const action = new AddNewProductBegin();
        const error = new Error('some error') as any;
        const outcome = new AddNewProductFailure({error});  
        
        actions = hot('-a|', { a: action });
        const response = cold('-#|', {}, error);
        productsService.addProduct.and.returnValue(response);
        
        const expected = cold('--(b|)', { b: outcome });
        expect(effects.addProduct$).toBeObservable(expected);
      });
    });

    describe('[DeleteProduct] Deleting product begin', () => {
      
      it('should return a stream of a deleted product', () => {
        const productID = 7;

        const action = new DeleteProductBegin();
        const outcome = new DeleteProductSuccess( productID );

        actions = hot('-a', { a: action });        

        const response = cold('-a|', { a: productID });       
        productsService.deleteProduct.and.returnValue(response);        

        const expected = cold('--b', { b: outcome });
        expect(effects.deleteProduct$).toBeObservable(expected);

      });
  
      it('should fail and return an action with the error', () => {
        const action = new DeleteProductBegin();
        const error = new Error('some error') as any;
        const outcome = new DeleteProductFailure({error});  
        
        actions = hot('-a|', { a: action });
        const response = cold('-#|', {}, error);
        productsService.deleteProduct.and.returnValue(response);
        
        const expected = cold('--(b|)', { b: outcome });
        expect(effects.deleteProduct$).toBeObservable(expected);
      });
    });

    describe('[UpdateProduct] Updating product', () => {
      
      it('should return a stream of an updated product', () => {
        const productID = 7;
        const updatedProduct: ProductModel = {       
          "id":51,
          "name":"Sony Vaio",
          "category":"Laptops",
          "image":"https://cdn.shopify.com/s/files/1/0225/2590/2923/products/vaio-s13-main-product-image-min_1000x.png?v=1562349830",
          "price":1249,
          "description":"Sony Vaio with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro" };


        const action = new UpdateProductBegin();
        const outcome = new UpdateProductSuccess( {index: productID, product: updatedProduct} );

        actions = hot('-a', { a: action });        

        const response = cold('-a|', { a: productID });       
        productsService.updateProduct.and.returnValue(response);        

        const expected = cold('--b', { b: outcome });
        expect(effects.updateProduct$).toBeObservable(expected);

      });
  
      it('should fail and return an action with the error', () => {
        const action = new UpdateProductBegin();
        const error = new Error('some error') as any;
        const outcome = new UpdateProductFailure({error});  
        
        actions = hot('-a|', { a: action });
        const response = cold('-#|', {}, error);
        productsService.updateProduct.and.returnValue(response);
        
        const expected = cold('--(b|)', { b: outcome });
        expect(effects.updateProduct$).toBeObservable(expected);
      });
    });


  });