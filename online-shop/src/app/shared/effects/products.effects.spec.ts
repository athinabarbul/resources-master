import { Observable, of } from "rxjs";
import { ProductsEffect } from './products.effects';
import { ProductService } from 'src/app/data/service/product-service/product.service';
import { TestBed } from '@angular/core/testing';
import { ProductModel } from 'src/app/data/schema/product-model';
import { LoadDataBegin, LoadDataSuccess } from '../actions/products.actions';
import { cold, hot } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoadDataFailure } from '../actions/products.actions';

describe('ProductsEffect', () => {
    let actions: Observable<any>;

    let effects: ProductsEffect;
    let productsService: jasmine.SpyObj<ProductService>;

    // const MockProductService = {
    //   getProducts () {
    //     return of({       
    //       "id":1,
    //       "name":"Notebook Basic 17",
    //       "category":"Laptops",
    //       "image":"https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
    //       "price":1249,
    //       "description":"Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro" 
    //   })}};
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ProductsEffect,
          provideMockActions(() => actions),
          {
            provide: ProductService,
            useValue: {
              getProducts: jasmine.createSpy()
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
  
      // it('should fail and return an action with the error', () => {
      //   const action = new LoadDataBegin();
      //   const error = new Error('some error') as any;
      //   const outcome = new LoadDataFailure(error);  
        
      //   actions = hot('-a', { a: action });

      //   const response = cold('-#|', {}, error);
      //   productsService.getProducts.and.returnValue(response);
        
  
      //   const expected = cold('--(b|)', { b: outcome });
      //   expect(effects.loadData$).toBeObservable(expected);
      // });
    });
  });