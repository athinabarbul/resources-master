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

  listOfProducts$: Observable<ProductModel[]>;
  currentProduct: ProductModel = undefined;
  listSubscription: Subscription;
  id: number;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private productService: ProductService,
    private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.listOfProducts$ = this.productService.getProducts();

    this.listSubscription = this.listOfProducts$.subscribe(listOfProducts => {
      for (let product of listOfProducts) {
        if (product.id === this.id)
          this.currentProduct = product;
      }
    })
  }

  addProductToCart(): void {
    this.cartService.addProductToCart(this.currentProduct);
    alert('Product' + this.currentProduct.name +  'added to cart');
  }

  deleteProduct(): void {
    this.httpClient.delete('http://localhost:3000/products/' + this.id).subscribe(response => {
      console.log("deleted");
    }, (error) => {
      console.log("nono deleted");
    });
  }

  goToProductEdit(i: number, currentProduct: ProductModel): void {
    this.router.navigate(['/edit-product/' + currentProduct.id]);
  }

  ngOnDestroy(): void{
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
  }

}
