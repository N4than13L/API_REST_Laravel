import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post"
import { global } from 'src/app/service/global/global';
import { PostServiceProvider } from 'src/app/service/post.service';
import { userServiceProvider } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostServiceProvider, userServiceProvider]
})

export class HomeComponent implements OnInit {
  public title: string
  public status: any
  public posts: Array<Post>
  public url: string
  public identity: any
  public token: any
  
  constructor(private _postService: PostServiceProvider,
    private _userServe: userServiceProvider) {
    this.title = "Pagina de inicio"
    this.url = global.url
    this.posts = []
    this.identity = this._userServe.getIdentity()
    this.token = this._userServe.getToken()
   }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(){
    this._postService.getPosts().subscribe(
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
        this.getPosts()
      },
      error =>{
        console.log(<any>error)
      }
    )

  }

}
