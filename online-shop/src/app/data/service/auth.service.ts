import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do'

import { UserModel } from '../schema/user';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private http: HttpClient) {
    }
  
    public getProducts(): Observable<UserModel[]> {
      return this.http.get<UserModel[]>('http://localhost:3000/users').map(data => _.values(data)).do(console.log);
    }
  
  }
  