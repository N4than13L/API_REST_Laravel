import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/service/global/global';
import { CategoryServiceProvider } from 'src/app/service/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { PostServiceProvider } from 'src/app/service/post.service';
import { userServiceProvider } from 'src/app/service/user.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryServiceProvider, PostServiceProvider, userServiceProvider]
})

export class CategoryDetailComponent implements OnInit {
  public title: string
  public posts: any
  public category: Category | any
  public url: string
  public token: any
  public identity: any

  constructor(
    private _router: Router, 
    private _route: ActivatedRoute,
    private _categoryService: CategoryServiceProvider,
    private _postService: PostServiceProvider,
    private _userServiceProvider: userServiceProvider
  ) { 
    this.url = global.url
    this.title = "Categoria"
    this.identity = this._userServiceProvider.getIdentity()
    this.token = this._userServiceProvider.getToken()
    // this.category = new Category(1,"")
  }

  ngOnInit(): void {
    this.getPostByCategory()

  }

  getPostByCategory(){
    this._route.params.subscribe(params =>{
      let id = +params['id']

      this._categoryService.getCategory(id).subscribe(
        response => {
          if(response.status == "success"){
            this.category = response.category

            this._categoryService.getPosts(id).subscribe(
              response => {
                if (response.status == "success"){
                  this.posts = response.posts
                }
              },error => {
                console.log(error)
              })
              
            
          } else{
           this._router.navigate(['/inicio'])
          }         
        }, 
        error =>{
          console.log(error)
        }
      )
    })
  }

  deletePost(id:any){
    this._postService.delete(this.token, id).subscribe(
      response =>{
       this.getPostByCategory()
      },
      error =>{
        console.log(<any>error)
      }
    )

  }

}
