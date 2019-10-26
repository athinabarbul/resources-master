import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';

import { ProductComponent } from './modules/product/product.component';
import { ProductListComponent } from './modules/product-list/product-list.component';
import { CartComponent } from './modules/cart/cart.component';
import { EditProductComponent } from './modules/edit-product/edit-product.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { AuthComponent } from './modules/auth/auth.component';

import { AuthGuard } from './core/guard/auth.guard';
import { RoleGuard } from './core/guard/role.guard';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DisableIfUnauthorizedDirectiveAdmin } from './shared/directive/disable-button-admin.directive';
import { DisableIfUnauthorizedDirectiveCustomer } from './shared/directive/disable-button-customer.directive';
import { reducers, metaReducers  } from './shared/reducers';
import { effects } from './shared/effects';

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
    RouterModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects)
    
  ],
  providers: [AuthGuard,RoleGuard,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
