import { browser, by, element } from 'protractor';

export class ProductPage {
  
  navigateTo() {
    return browser.get('/product/0'); 
  }

  getPageTitleText() {
    return element(by.css('app-root h1')).getText();
  }

}