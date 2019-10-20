import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../data/service/product.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductModel } from '../../data/schema/product-model';


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
   private router: Router, private fb: FormBuilder, private http: HttpClient) {
      this.createForm();
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productService.getProductById(this.id);


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

     this.editProductForm.value;
     console.log( this.editProductForm.value.name);

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    this.http.put('http://localhost:3000/products/' + this.id,
      {
        "id": this.id,
        "name":  this.editProductForm.value.name ? this.editProductForm.value.name : this.currentProduct.name,
        "category": this.editProductForm.value.category ? this.editProductForm.value.category : this.currentProduct.category,
        "price": this.editProductForm.value.price ? this.editProductForm.value.price : this.currentProduct.price,
        "image": this.editProductForm.value.image ? this.editProductForm.value.image : this.currentProduct.image,
        "description": this.editProductForm.value.description ? this.editProductForm.value.description : this.currentProduct.description
      },
      { headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
            this.router.navigate(['/product/' + this.id]);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }

  ngOnDestroy(): void{
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
