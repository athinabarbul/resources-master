import { ProductModel } from '../product/product-model';

export class CartItemModel {

  quantity: number;
  product: ProductModel;

  constructor(product: ProductModel, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }


}
