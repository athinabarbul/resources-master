import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/data/service/auth-service/auth.service';
import { Role } from 'src/app/data/schema/role';

@Directive({
    selector: '[disableIfNotAdmin]'
})
export class DisableIfUnauthorizedDirectiveAdmin implements OnInit {
 
    constructor(private el: ElementRef, private authorizationService: AuthService) { }
 
    ngOnInit() {
        let permission = Role.Admin;
        
        if (!this.authorizationService.hasPermission(permission)) {
            
            this.el.nativeElement.disabled = true;
        }
    }
}