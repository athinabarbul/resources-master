import { browser, element, by, Key } from 'protractor';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

export class AuthPage{

    private credentias = {
        username: 'doej',
        password: 'password'
      };


    navigateTo(){
        return browser.get('/login');
    }

    getPageTitleText() {
        return element(by.css('app-root h5')).getText();
    }

    fillCredentials(credentias: any = this.credentias) {
        element(by.name('username')).sendKeys(credentias.username);
        element(by.name('password')).sendKeys(credentias.password);
        element(by.css('.btn-login')).click();
      }

   getErrorMessage() {
    return element(by.css('.alert-danger')).getText();
  }
}