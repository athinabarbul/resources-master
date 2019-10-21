import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './modules/product/product.component';
import { ProductListComponent } from './modules/product-list/product-list.component';
import { EditProductComponent } from './modules/edit-product/edit-product.component';
import { CartComponent } from './modules/cart/cart.component';
import { AuthComponent } from './modules/auth/auth.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]},
  { path: 'shopping-cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
