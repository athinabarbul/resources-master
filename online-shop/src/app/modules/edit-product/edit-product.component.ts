import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../data/service/product-service/product.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductModel } from '../../data/schema/product-model';
import { Store } from '@ngrx/store';
import * as ProductsActions from "../../shared/actions/products.actions";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id: number;
  
  product$: Observable<ProductModel>;
  currentProduct: ProductModel = undefined;
  productSubscription: Subscription;

  editProductForm: FormGroup;



  constructor(private route: ActivatedRoute, private productService: ProductService,
   private router: Router, private fb: FormBuilder, private http: HttpClient,
   private store: Store<{fromProducts: {products: ProductModel[]}}>) {
      this.createForm();
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productService.getProductById();


    this.productSubscription = this.product$.subscribe(product => {
      this.currentProduct = product;
    })
  }

  createForm() {
    this.editProductForm = this.fb.group ({
       name: ['',Validators.required],
       category: ['',Validators.required],
       image: ['',Validators.required],
       price: ['',Validators.required],
       description: ['',Validators.required]
    });
  }

  goToProductDetails(i: number, currentProduct: ProductModel): void {
    this.router.navigate(['/product/' + currentProduct.id]);
  }

  saveProductDetails(): void{

    this.productService.updatedProduct = new ProductModel(this.id,
      this.editProductForm.value.name ? this.editProductForm.value.name : this.currentProduct.name,
      this.editProductForm.value.category ? this.editProductForm.value.category : this.currentProduct.category,
      this.editProductForm.value.price ? this.editProductForm.value.price : this.currentProduct.price,
      this.editProductForm.value.image ? this.editProductForm.value.image : this.currentProduct.image,
      this.editProductForm.value.description ? this.editProductForm.value.description : this.currentProduct.description
    );

    this.store.dispatch(new ProductsActions.UpdateProduct({
      index: +this.id,
      product: this.productService.updatedProduct
    }));
    this.productService.updateProduct();
    this.router.navigate(['/product/'+ this.id]);

  }

  ngOnDestroy(): void{
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
