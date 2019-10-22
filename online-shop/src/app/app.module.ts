import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductComponent } from './modules/product/product.component';
import { ProductListComponent } from './modules/product-list/product-list.component';
import { CartComponent } from './modules/cart/cart.component';
import { EditProductComponent } from './modules/edit-product/edit-product.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { AuthComponent } from './modules/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthGuard } from './core/guard/auth.guard';
import { RoleGuard } from './core/guard/role.guard';
import { DisableIfUnauthorizedDirectiveAdmin } from './shared/directive/disable-button-admin.directive';
import { DisableIfUnauthorizedDirectiveCustomer } from './shared/directive/disable-button-customer.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent,
    EditProductComponent, 
    AddProductComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    DisableIfUnauthorizedDirectiveAdmin,
    DisableIfUnauthorizedDirectiveCustomer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [AuthGuard,RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
