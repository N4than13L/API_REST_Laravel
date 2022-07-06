import { Component, OnInit, DoCheck } from '@angular/core';
import { userServiceProvider } from './service/user.service';
import { CategoryServiceProvider } from './service/category.service';
import { global } from './service/global/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userServiceProvider, CategoryServiceProvider]
})

export class AppComponent implements OnInit, DoCheck {
  public title = 'Blog-angular';
  public identity: any
  public token: any
  public categories: any 
  public url: string


  constructor(public _userService: userServiceProvider, private _categoryServiceProvider: CategoryServiceProvider){
    this.loginUser()
    this.url = global.url
  }

  ngOnInit() {
    console.log("mensaje")
    this.getCategory()
  }

  ngDoCheck(){
    this.loginUser()
  }

  loginUser(){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }

  getCategory(){
    this._categoryServiceProvider.getCategories().subscribe(
      response =>{
        if (response.status == "success") {
          this.categories = response.categories
          // console.log(this.categories)
        }
      },error =>{
        console.log(<any>error)
      }
    )
  }


}
