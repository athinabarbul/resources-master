import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from 'src/app/data/service/auth.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {

    for (let item in this.authService.userRole) {
            console.log(item);
    }

    const expectedRole = route.data.expectedRole;
    if (
      !this.authService.isAuthenticated || 
      this.authService.userRole !== expectedRole
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}