import { Injectable } from "@angular/core"
import { Router, CanActivate } from "@angular/router"
import { userServiceProvider } from "./user.service"

@Injectable()
export class IdentityGuard implements CanActivate{
    constructor( private _router: Router,
         private _userServiceProvider: userServiceProvider){
        
    }

    canActivate(){
        let identity = this._userServiceProvider.getIdentity()

        if(identity){
            return true
        }else{
            this._router.navigate(['/error'])
            return false
        }
    }
}