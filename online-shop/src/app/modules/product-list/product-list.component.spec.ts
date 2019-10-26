import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from 'src/app/data/service/product-service/product.service';
import { ProductModel } from 'src/app/data/schema/product-model';
import { of } from 'rxjs/internal/observable/of';
import { CartService } from 'src/app/data/service/cart-service/cart.service';
import { Router, NavigationExtras } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const mockProductList : ProductModel[] = [
    {
      "id":1,
      "name":"Notebook Basic 17",
      "category":"Laptops",
      "image":"https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
      "price":1249,
      "description":"Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro"
    }
  ];

  class mockProductService {

    lastId: number = 88;
    navigateToProductId: number = 7;

    getItems(){
      return of(mockProductList);
    }
     
    loadSingleProduct(){
    }    
  }

  const mockCartService = {
    loadCartItems(){
    }
  }

  const mockRouter = {
    navigate(commands: any[], extras?: NavigationExtras){

    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        {
          provide: ProductService,
          useClass: mockProductService
        },
        {
          provide: CartService,
          useValue: mockCartService
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('h2 category should show product category', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll(('h2'))[0].textContent).toContain(mockProductList[0].category);
  });

  it('h2 name should show product name', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll(('h2'))[1].textContent).toContain(mockProductList[0].name);
  });

  it('h2 price should show product price', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll(('h2'))[2].textContent).toContain(mockProductList[0].price);
  });


});
