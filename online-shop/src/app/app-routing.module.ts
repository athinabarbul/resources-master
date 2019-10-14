import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'product/:id', component: ProductComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'shopping-cart', component: CartComponent },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
