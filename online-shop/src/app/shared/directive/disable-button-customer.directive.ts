import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/data/service/auth-service/auth.service';
import { Role } from 'src/app/data/schema/role';

@Directive({
    selector: '[disableIfNotCustomer]'
})
export class DisableIfUnauthorizedDirectiveCustomer implements OnInit {
 
    constructor(private el: ElementRef, private authorizationService: AuthService) { }
 
    ngOnInit() {
        let permission = Role.Customer;
        
        if (!this.authorizationService.hasPermission(permission)) {
            
            this.el.nativeElement.disabled = true;
        }
    }
}