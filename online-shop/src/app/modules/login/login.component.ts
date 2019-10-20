import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

}
