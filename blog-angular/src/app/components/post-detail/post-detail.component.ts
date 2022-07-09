import { Component, OnInit } from '@angular/core'
import { PostServiceProvider } from 'src/app/service/post.service'
import { Post } from 'src/app/models/post'
import {Router, ActivatedRoute, Params} from "@angular/router"
import { global } from 'src/app/service/global/global'
import { userServiceProvider } from 'src/app/service/user.service'


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostServiceProvider, userServiceProvider]
})

export class PostDetailComponent implements OnInit {
  public post: Post
  public user: any
  public url: any
  public identity: any
  public token :any

  constructor(
    private _postService: PostServiceProvider,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: userServiceProvider
  ) { 
    this.post = new Post(1,1,1, "", "", "", [])
    this.url = global.url
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getPost()
  }

  getPost(){
    // Sacar el id del post
    this._route.params.subscribe(params => {
      let id = +params['id']

      // Respuesta ajax para sacar los datos de la entrada.
      this._postService.getPost(id).subscribe(
          response =>{
            if(response.status == "success"){
              this.post = response.post
              console.log(this.post)
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
