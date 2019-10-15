import { ProductModel } from '../product/product-model';

export class CartItemModel {

  quantity: number;
  id: number;
  name: string;
  category?: string;
  price: number;
  image?: string;
  description?: string;

  constructor(id:number, name:string, category: string, price:number, image: string, description: string, quantity: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.image = image;
    this.description = description;
    this.quantity = quantity;
  }


}
