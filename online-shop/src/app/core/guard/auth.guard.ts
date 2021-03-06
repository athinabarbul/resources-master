import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/data/service/auth-service/auth.service';
import { CartService } from 'src/app/data/service/cart-service/cart.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private cartService: CartService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
      ):
        | boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        return this.authService.userBehaviour.pipe(
          take(1),
          map(user => {
            const isAuth = !!user;
            if (isAuth) {
              return true;
            }
            return this.router.createUrlTree(['/login']);
          })

        );
      }
}