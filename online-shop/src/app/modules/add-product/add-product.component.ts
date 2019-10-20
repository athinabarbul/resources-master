import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductModel } from '../../data/schema/product-model';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../data/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  id: number;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

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

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

      this.http.post('http://localhost:3000/products',
        {
          "id": this.id,
          "name":  this.addProductForm.value.name,
          "category": this.addProductForm.value.category,
          "price": this.addProductForm.value.price,
          "image": this.addProductForm.value.image,
          "description": this.addProductForm.value.description
        },
        { headers })
        .subscribe(
          val => {
            console.log("POST call successful value returned in body",
              val);
              this.router.navigate(['/product-list']);
          },
          response => {
            console.log("POST call in error", response);
          },
          () => {
            console.log("The POST observable is now completed.");
          }
        );

  }

}
