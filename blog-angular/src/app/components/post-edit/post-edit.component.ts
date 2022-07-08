import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router"
import { userServiceProvider } from 'src/app/service/user.service';
import { CategoryServiceProvider } from 'src/app/service/category.service';
import { PostServiceProvider } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post';
import { global } from 'src/app/service/global/global';


@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [userServiceProvider, CategoryServiceProvider,
    PostServiceProvider]
})

export class PostEditComponent implements OnInit {
  public title: string
  public identity: any
  public token: any
  public post: Post | any
  public categories: any
  public status: any
  public resetVar: any
  public url: any
  public is_edit: boolean

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
    this.title = "Editar entrada"
      this.url = global.url
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.is_edit = true
  }

  ngOnInit(): void {
    this.post = new Post(1,1,1, "", "", "", [])
    this.getCaterory()
    this.getPost()
  }

  getCaterory(){
    this._categoryServiceProvider.getCategories().subscribe(
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

  onSubmit(form: any){
    this._postServiceProvider.update(this.token, this.post, this.post.id).subscribe(
        response => {
            if(response.status == 'success'){
                this.status = 'success';
                this.post = response.post
                this._router.navigate(['/detalle-entrada', this.post.id])

            }else{                   
                this.status = 'error'
            }
        },
        error => {
          this.status = 'error'
        }
    )
}


  getPost(){
    // Sacar el id del post
    this._route.params.subscribe(params => {
      let id = +params['id']

      // Respuesta ajax para sacar los datos de la entrada.
      this._postServiceProvider.getPost(id).subscribe(
          response =>{
            if(response.status == "success"){
              this.post = response.post
              console.log(this.post)

              if(this.post.user_id != this.identity.sub){
                this._router.navigate(['/inicio'])
              }
            }
            else{
              this._router.navigate(['/inicio'])
            }
          },
          error =>{
            console.log(<any>error)
            this._router.navigate(['/inicio'])
          }
      ) 
    })
  }

}
