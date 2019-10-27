import { browser, by, element } from 'protractor';

export class OnlineShopPage {
  
  navigateTo() {
    return browser.get('/'); 
  }

  getPageTitleText() {
    return element(by.css('app-root h1')).getText();
  }

}