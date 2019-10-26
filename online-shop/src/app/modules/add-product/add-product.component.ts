import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductModel } from '../../data/schema/product-model';
import { Router } from '@angular/router';
import { ProductService } from '../../data/service/product-service/product.service';
import { Store } from '@ngrx/store';
import * as ProductsActions from "../../shared/actions/products.actions";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  id: number;
  


  constructor(private fb: FormBuilder, private http: HttpClient,
     private router: Router, private productService:ProductService,
     private store: Store<{fromProducts: {products: ProductModel[]}}>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addProductForm = this.fb.group ({
       name: ['',Validators.required],
       category: ['',Validators.required],
       image: ['',Validators.required],
       price: ['',Validators.required],
       description: ['',Validators.required]
    });
  }

  saveProductDetails(): void{
  
   const id= this.productService.lastId;
      this.productService.newProduct={id,... this.addProductForm.value};
      
      this.store.dispatch(new ProductsActions.AddNewProduct(this.productService.newProduct));
      this.productService.addProduct(); 
      this.router.navigate(['/product-list']);

  }

}
