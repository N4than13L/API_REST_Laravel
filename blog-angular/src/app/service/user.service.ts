import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { global } from "./global/global"
import { Observable } from "rxjs";

@Injectable()
export class userServiceProvider {
    public url: string

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url
    }

    test(){
        return "hola desde servicio"
    }

    register(user: any): Observable<any>{
        let json = JSON.stringify(user)
        let params = 'json=' + json
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.post(this.url + 'register', params, {headers: headers})
    }

    signup(user: any, gettoken:any = null): Observable<any>{
        if(gettoken != null){
           user.gettoken = 'true'
        }

        let json = JSON.stringify(user)
        let params = 'json=' + json
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        return this._http.post(this.url + 'login', params, {headers: headers})

    }
}
