import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../product/service/product.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { ProductModel } from '../product/product-model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id: number;

  listOfProductsObserv$: Observable<ProductModel[]>;
  currentProduct: ProductModel = undefined;
  listSubscription: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService,
   private router: Router) {

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.listOfProductsObserv$ = this.productService.getProducts();


    this.listSubscription = this.listOfProductsObserv$.subscribe(listOfProducts => {
      for (let product of listOfProducts) {
        if (product.id === this.id)
          this.currentProduct = product;
      }
    })
  }

  goToProductDetails(i: number, currentProduct: ProductModel): void {
    this.router.navigate(['/product/' + currentProduct.id]);
  }

  ngOnDestroy(): void{
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
  }

}
