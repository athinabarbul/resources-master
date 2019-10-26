import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../schema/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../../schema/role';
import { CartItemModel } from '../../schema/cart-item-model';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    user: UserModel;
    userBehaviour = new BehaviorSubject<UserModel>(null);
    isAuthenticated = false;
    userRole = Role;
    userLoggedIn :string;
    userCart : CartItemModel[];
    username: string;

    constructor(private http: HttpClient) {
    }

    getCurrentUserDetails() : Observable<UserModel> {
      return <Observable<UserModel>>this.http.get("http://localhost:3000/users/" + this.userLoggedIn);
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
          tap(resData => {
            this.isAuthenticated = true;
            this.userRole = resData.roles;
            this.userLoggedIn = resData.username,
            this.userCart = resData.cart,
            console.log(this.userCart);
            this.handleAuthentication(
              resData.username,
              resData.fullName,
              resData.roles,
              resData.cart
            );
          })
        );
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

      hasPermission(permission: Role) {    
        if(Object.values(this.userRole).includes(permission)){
          return true;
        }
        return false;
    }
  
  }