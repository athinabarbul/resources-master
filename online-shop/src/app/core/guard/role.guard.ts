import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from 'src/app/data/service/auth-service/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    let roleFlag = false;

     for(let roleMember in this.authService.userRole){
         for(let expectedRoleMember in expectedRole){
             
             if( this.authService.userRole[roleMember] === expectedRole[expectedRoleMember]){
                 roleFlag = true;
             }
         }
     }
    if (
      !this.authService.isAuthenticated || 
      !roleFlag
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}