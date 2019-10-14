import { Injectable } from '@angular/core';
import { ProductModel } from '../product-model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listOfProducts: ProductModel[] = [];

  constructor() {
    this.listOfProducts.push(new ProductModel(15263,'Iphone X', 'Phones', 500, 'https://images.idgesg.net/images/article/2018/09/iphone-xs-sizes-100771828-large.jpg', 'Blabla'));
    this.listOfProducts.push(new ProductModel(265981,'Galaxy Note 10', 'Phones', 450, 'https://ss7.vzw.com/is/image/VerizonWireless/samsung-note10-plus-5g-back-pen-aura-glow?$png8alpha256$&hei=520', 'Lugukugu'));
    this.listOfProducts.push(new ProductModel(3,'Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel(4,'Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel(5,'Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel(6,'Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel(7,'Iphone XS', 'Phones', 450, '', ''));
  }

  getProducts(): ProductModel[]{
    return this.listOfProducts;
  }

  getProductById(id: number): ProductModel{
      for (let product of this.listOfProducts){
        if (product.id === id)
          return product;
      }
      return undefined;
  }

}
