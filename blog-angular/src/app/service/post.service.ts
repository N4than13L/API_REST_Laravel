import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { global } from "./global/global"
import { Post } from "../models/post";
import { Observable } from "rxjs";

@Injectable()
export class PostServiceProvider {
    public url: string

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url
    }

    testing(){
       return "hola desde servicio"
    }
}