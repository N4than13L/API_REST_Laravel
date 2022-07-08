import { Component, OnInit } from '@angular/core'
import { userServiceProvider } from '../../service/user.service'
import { CategoryServiceProvider } from '../../service/category.service'
import { global } from '../../service/global/global'
import { Post } from 'src/app/models/post'
import { User } from 'src/app/models/user'
import {Router, ActivatedRoute, Params} from "@angular/router"
import { PostServiceProvider } from 'src/app/service/post.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [CategoryServiceProvider, userServiceProvider,
  PostServiceProvider]
})

export class ProfileComponent implements OnInit {

  public title = 'Blog-angular';
  public identity: any
  public token: any
  public categories: any 
  public url: string
  public status: any
  public posts: Post | any
  public userId: any
  public user: User | any

  constructor(public _userService: userServiceProvider, 
    private _categoryServiceProvider: CategoryServiceProvider,
    private _route: ActivatedRoute,
    private _router: Router, private _postService: PostServiceProvider) {
    this.url = global.url
   }

  ngOnInit(): void {
    this.getUser(this.userId)
    this.getParams()
  }

  getParams(){
    this._route.params.subscribe(params => {
      let id = +params['id']
      this.getPosts(this.userId)
    })
    
  }

  getUser(userId: any){
    this._userService.UserDetail(this.userId).subscribe(
      response =>{
        if (response.status == "success"){
          this.user = response.user
          console.log(this.user)
        } 
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  getPosts(userId: any){
    this._userService.getPosts(this.userId).subscribe(
      response => {
        if (response.status == "success"){
          this.posts = response.post
          this.status = "success"
          console.log(this.posts)
        }
      },
      error => {
        this.status = "error"
        console.log(<any>error)
      }
    )
  }

  deletePost(id:any){
    this._postService.delete(this.token, id).subscribe(
      response =>{
        this.getPosts(this.userId)
      },
      error =>{
        console.log(<any>error)
      }
    )

  }

}
