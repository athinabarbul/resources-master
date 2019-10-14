import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product/product-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  listOfProducts: ProductModel[] = [];

  constructor() { }

  ngOnInit() {
    this.listOfProducts.push(new ProductModel('Iphone X', 'Phones', 500, '', ''));
    this.listOfProducts.push(new ProductModel('Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel('Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel('Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel('Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel('Iphone XS', 'Phones', 450, '', ''));
    this.listOfProducts.push(new ProductModel('Iphone XS', 'Phones', 450, '', ''));
  }

}
