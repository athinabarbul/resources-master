import { ProductsEffect } from "./products.effects";
import { CartEffects } from './cart.effects';
import { ProductEffect } from './product.effects';

export const effects: any[] = [ProductsEffect, CartEffects, ProductEffect];