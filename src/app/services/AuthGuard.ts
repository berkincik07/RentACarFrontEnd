import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { MyAlertService } from "./my-Alert.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        public apiService : ApiService,
        public alert : MyAlertService,
        public router: Router
        
        ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var auths = route.data["auths"] as Array<string>;
        var redirect = route.data["redirect"] as string;

        if (!this.apiService.sessionControl() || !auths || !auths.length){
            this.router.navigate([redirect]);
            return false;
        }

        var result:boolean = false;

        result = this.apiService.authControl(auths)

        if(!result){
            this.router.navigate([redirect]);
        }

        return result

    }   
}
