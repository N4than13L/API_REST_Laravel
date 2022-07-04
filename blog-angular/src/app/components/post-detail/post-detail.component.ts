import { Component, OnInit } from '@angular/core';
import { PostServiceProvider } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post';
import {Router, ActivatedRoute, Params} from "@angular/router"


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostServiceProvider]
})
export class PostDetailComponent implements OnInit {
  public post: Post
  public user: any

  constructor(
    private _postService: PostServiceProvider,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
    this.post = new Post(1,1,1, "", "", "", [])
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
