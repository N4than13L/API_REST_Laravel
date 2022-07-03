import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router"
import { userServiceProvider } from 'src/app/service/user.service';
import { CategoryServiceProvider } from 'src/app/service/category.service';
import { PostServiceProvider } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post';
import { global } from 'src/app/service/global/global';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [userServiceProvider, CategoryServiceProvider
  , PostServiceProvider]
})

export class PostNewComponent implements OnInit {
  public title: string
  public identity: any
  public token: any
  public post: any
  public categories: any
  public status: any
  public resetVar: any

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .jpeg, .gif",
    maxSize: "50",
    uploadAPI:  {
    url: global.url + "post/upload",
      headers: {
     "Authorization" : this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: "sube tu foto de perfil"
  }

  constructor(private _userService: userServiceProvider, 
    private _categoryServiceProvider: CategoryServiceProvider,
    private _postServiceProvider: PostServiceProvider,
    private _route: ActivatedRoute,
    private _router: Router ) { 
    this.title = "Crear una nueva entrada"
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }
  

  ngOnInit(): void {
    this.getCaterory()
    this.post = new Post(1, this.identity.sub, 1, '','', '', null)
    // console.log(this.post)
  }

  getCaterory(){
    this._categoryServiceProvider.getCategory().subscribe(
      response =>{
        if(response.status == "success"){
          this.categories = response.categories
        }
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  imageUpload(data: any){
    let image_upload = JSON.parse(data.response)
    this.post.image = image_upload.image  
    
  }

  onSubmit(info: any){
    console.log(this._postServiceProvider.testing())
  }

}
