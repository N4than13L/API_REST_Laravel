import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { User } from "../models/user";
import { global } from "./global/global"
import { Observable } from "rxjs";

@Injectable()
export class userServiceProvider {
    public url: string

    constructor(
        public _http: HttpClient
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
}
