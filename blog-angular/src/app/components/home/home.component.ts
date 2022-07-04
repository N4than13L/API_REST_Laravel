import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post"
import { global } from 'src/app/service/global/global';
import { PostServiceProvider } from 'src/app/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostServiceProvider]
})
export class HomeComponent implements OnInit {
  public title: string
  public status: any
  public posts: Post[]
  public url: string

  constructor(private _postService: PostServiceProvider) {
    this.title = "Pagina de inicio"
    this.url = global.url
    this.posts = []
   }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == "success"){
          this.posts = response.posts
          console.log(this.posts)
        }
      },
      error => {
        console.log(<any>error)
      }
    )
  }

}
