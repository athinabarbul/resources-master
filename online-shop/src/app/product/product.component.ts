import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product-model';

import { CartService } from '../cart/service/cart.service';
import { ProductService } from '../product/service/product.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  currentProduct: ProductModel;

  constructor(private route: ActivatedRoute, private productService: ProductService,
  private cartService:CartService ) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.currentProduct = this.productService.getProductById(id);
  }

  addProductToCart(): void{
    this.cartService.addProductToCart(this.currentProduct);
    alert('Product added to cart');
  }

}
