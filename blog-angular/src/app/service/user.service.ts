import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { global } from "./global/global"
import { Observable } from "rxjs";

@Injectable()
export class userServiceProvider {
    public url: string
    public identity: any
    public token: any

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

    update(token: any , user: any): Observable<any>{
        let json = JSON.stringify(user)
        let params = "json=" + json

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set("Authorization", token)
        
        return this._http.put(this.url + 'user/update', params, {headers: headers})

    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity') || "{}")
        
        if(identity && identity != "undefined"){
            this.identity = identity
            // console.log(localStorage.getItem('identity'))
        }else{
            this.identity = null
        }

        return this.identity
    }

    getToken(){
        let token = localStorage.getItem('token')
        
        if(token && token != "undefined"){
            this.token = token
        }else{
            this.token = null
        }
        return this.token 
        
    }

    getPosts(id: number): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        return this._http.get(this.url + "post/user/" + id, {headers: headers})
    }

    getUser(id: number): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        return this._http.get(this.url + "user/detail/" + id, {headers: headers})
    }
}
