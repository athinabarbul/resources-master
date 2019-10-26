import { AuthPage } from './auth/auth.po';

import { ProductListPage } from './product-list/product-list.po';
import { OnlineShopPage } from './online-shop/online-shop.po';
import { ProductPage } from './product/product.po';

describe('user to product details', function () {
    let authPage: AuthPage;
    let productsPage: ProductListPage;
    let shopPage: OnlineShopPage;
    let productPage: ProductPage;
  
    beforeEach(() => {
      shopPage = new OnlineShopPage();
      authPage = new AuthPage();
      productsPage = new ProductListPage();
      productPage = new ProductPage;
    });

    it('when user browses to our app he should be redirected to the login screen', () => {
      shopPage.navigateTo();
      expect(shopPage.getPageTitleText()).toEqual('Sign In');
    });

    it('when login is successful — he should redirect to the product list page', () => {
      shopPage.navigateTo();
      expect(shopPage.getPageTitleText()).toEqual('Sign In');
      
      authPage.navigateTo();
      authPage.fillCredentials();
      expect(productsPage.getPageTitleText()).toEqual('Products');
    }); 

    it('product list should display a list of products', () => {
      authPage.navigateTo();
      authPage.fillCredentials();
      expect(productsPage.getProductElements().count()).toBe(51);
    }); 

    it('should open and view the first product', () => {
      authPage.navigateTo();
      authPage.fillCredentials();
      productsPage.getOpenProductDetails().click();
  
      expect(productsPage.getOpenProductDetails()).toBeTruthy();
      expect(productPage.getPageTitleText()).toBe('Product: Notebook Basic 15');
    });
  
  });