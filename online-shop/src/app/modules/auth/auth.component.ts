import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/data/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {


  loginForm: FormGroup;
  isLoading = false;
  error: string = null;
  errorHeader : string = null;
  loginSubscription : Subscription;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router,
    private authService : AuthService) {
      this.createForm();
  }

  ngOnInit() {

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
