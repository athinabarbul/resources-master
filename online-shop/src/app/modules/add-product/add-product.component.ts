import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../../data/service/product-service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  id: number;
  
  constructor(private fb: FormBuilder, private http: HttpClient,
     private router: Router, private productService:ProductService) { }

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
      
      this.productService.addNewProduct(); 
      this.router.navigate(['/product-list']);

  }

}
