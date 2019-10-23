import { Component, OnDestroy } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/data/service/auth-service/auth.service';
import { ProductService } from 'src/app/data/service/product-service/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {


  loginForm: FormGroup;
  isLoading = false;
  error: string = null;
  errorHeader : string = null;
  loginSubscription : Subscription;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router,
    private authService : AuthService, private productService : ProductService) {
      this.createForm();
  }

 
  createForm() {

    this.loginForm = this.fb.group ({
       userName: ['',Validators.required],
       userPassword: ['',Validators.required],
    });
  }

  login(){

    this.isLoading = true;
       
      this.loginSubscription = this.authService.loginObsv(this.loginForm.value.userName, 
        this.loginForm.value.userPassword).subscribe(
        val => {
          this.productService.load();
          this.router.navigate(['/product-list']);
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          this.errorHeader = response.error;
          this.error = response.message;
          this.isLoading = false;
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        }
      );
  }

  ngOnDestroy(): void {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }

}