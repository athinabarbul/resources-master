import { browser, by, element } from 'protractor';

export class ProductListPage {
  navigateTo() {
    return browser.get('/product-list'); 
  }

  getPageTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getProductElements() {
    return element.all(by.css('#productList tr'));
  }

  getFirstPokemonCardElement() {
    return element(by.css('#productList tr'));
  }
  
  getOpenProductDetails() {
    return element(by.css('#productList tr a'));
  }
}