import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../schema/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Role } from '../schema/role';
import { CartItemModel } from '../schema/cart-item-model';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    user: UserModel;
    userBehaviour = new BehaviorSubject<UserModel>(null);

    constructor(private http: HttpClient, private router: Router) {
    }

    public getUserDetails(): Observable<UserModel[]> {
      return this.http.get<UserModel[]>('http://localhost:3000/login').do(console.log);
    }
    
    loginObsv(userName:string, userPassword:string) : Observable<any>{
    
      const headers = new HttpHeaders()
          .set("Content-Type", "application/json");


          
      return this.http.post('http://localhost:3000/login',
        { 
          "username": userName,
          "password": userPassword
        },
        { headers }).pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuthentication(
              resData.username,
              resData.fullName,
              resData.roles,
              resData.cart
            );
          })
        );
      }

      private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        return throwError(errorMessage);
      }

      private handleAuthentication(
        username: string,
        fullName: string,
        roles: Role,
        cart: CartItemModel[]
      ) {
        const user = new UserModel(username, fullName, roles, cart);
        this.userBehaviour.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      }
  
    }
  