import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../schema/user';
import { Role } from '../../schema/role';


describe('AuthService', () => {
    let component: AuthService;
    let fixture: ComponentFixture<AuthService>;

    let authService: AuthService;
    let mockHttp : HttpClient;


    const mockUserLogin = 
    {
        "username": "doej",
        "password" : "password"
    }

    beforeEach(() => { authService = new AuthService(mockHttp); });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ AuthService ],
          providers: [
            {
              provide: HttpClient,
              useValue: mockHttp
            }
          ]
        })
        .compileComponents();
      }));
    
      beforeEach(() => {
        fixture = TestBed.createComponent(AuthService);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  
  
    // it('#getObservableValue should return value from observable',
    //   (done: DoneFn) => {
    //     authService.loginObsv("doej", "password").subscribe(value => {
    //     expect(value).toBe(mockUserLogin);
    //     done();
    //   });
    // });
  
    // it('#getPromiseValue should return value from a promise',
    //   (done: DoneFn) => {
    //     authService.getPromiseValue().then(value => {
    //     expect(value).toBe('promise value');
    //     done();
    //   });
    // });
  });