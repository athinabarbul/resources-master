import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductModel } from '../../data/schema/product-model';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../data/service/product.service';
import * as fromProducts from "../../shared/reducers/products.reducer";
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
    this.id = Math.floor(Math.random() * 10001);
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

    this.store.dispatch(new ProductsActions.AddNewProduct(new ProductModel(this.id,
      this.addProductForm.value.name,
      this.addProductForm.value.category,
      this.addProductForm.value.price,
      this.addProductForm.value.image,
      this.addProductForm.value.description)));
    
      this.router.navigate(['/product-list']);

  }

}
