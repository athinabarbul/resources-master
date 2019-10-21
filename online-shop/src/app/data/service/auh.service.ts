import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private http: HttpClient) {
    }
    
    loginObsv(userName:string, userPassword:string) : Observable<any>{
    
    const headers = new HttpHeaders()
        .set("Content-Type", "application/json");
        
    return this.http.post('http://localhost:3000/login',
      {
        "username": userName,
        "password": userPassword
      },
      { headers })
    }

  }
  