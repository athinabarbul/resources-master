import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../schema/user';
import { Role } from '../../schema/role';
import { of } from 'rxjs/internal/observable/of';

describe('AuthService', () => {

    let authService: AuthService;
    let mockHttp : HttpClient;

    const mockUserLogin = 
    {
        "username": "doej",
        "password" : "password"
    }

    const mockUserDetails : UserModel = 
    {
      "username":"doej",
      "fullName":"John Doe",
      "roles": Role["customer"],
      "cart":[]
    }

    beforeEach(() => { authService = new AuthService(mockHttp); 
      spyOn(authService, "loginObsv").and.returnValue(of(mockUserLogin));
      spyOn(authService, "getCurrentUserDetails").and.returnValue(of(mockUserDetails));
      spyOn(authService, "hasPermission").and.returnValue(true);
    }); 
  
    it('loginObsv should return value from observable',
      (done: DoneFn) => {
        authService.loginObsv("doej", "password").subscribe(value => {
        expect(value).toBe(mockUserLogin);
        done();
      });
    });

    it('getCurrentUserDetails should return value from observable',
    (done: DoneFn) => {
      authService.getCurrentUserDetails().subscribe(value => {
      expect(value).toBe(mockUserDetails);
      done();
    });
   });

   it('hasPermission should return true if user has permission of admin',() => {
    expect(authService.hasPermission(Role["admin"])).toBe(true);
   });

  });

 