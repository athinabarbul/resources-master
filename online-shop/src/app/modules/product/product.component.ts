import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from '../../data/schema/product-model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { CartService } from '../../data/service/cart.service';
import { ProductService } from '../../data/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';

import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product$: Observable<ProductModel>;
  currentProduct: ProductModel = undefined;
  productSubscription: Subscription;
  id: number;
  

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private productService: ProductService,
    private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productService.getProductById(this.id);

    this.productSubscription = this.product$.subscribe(product => {
          this.currentProduct = product;
    })
  }

  addProductToCart(): void {
    this.cartService.addProductToCart(this.currentProduct);
    alert('Product ' + this.currentProduct.name +  ' added to cart');
  }

  deleteProduct(): void {
    this.httpClient.delete('http://localhost:3000/products/' + this.currentProduct.id).subscribe(response => {
      console.log("deleted");
      this.router.navigate(['/product-list']);
    }, (error) => {
      console.log("nono deleted");
    });

    
  }

  goToProductEdit(i: number, currentProduct: ProductModel): void {
    this.router.navigate(['/edit-product/' + currentProduct.id]);
  }

  ngOnDestroy(): void{
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
