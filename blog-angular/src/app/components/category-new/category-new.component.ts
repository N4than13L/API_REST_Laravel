import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { userServiceProvider } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from "@angular/router" 
import { CategoryServiceProvider } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [userServiceProvider, CategoryServiceProvider]
})

export class CategoryNewComponent implements OnInit {
  public title: string
  public identity: any
  public token: any
  public category: Category
  public status: any

  constructor(private _router: Router, private _activatedRouter: ActivatedRoute
    , private _userService: userServiceProvider, private _categoryServiceProvider: CategoryServiceProvider) {
    this.title = "crear nueva categoria."
    this.token = _userService.getToken()
    this.identity = _userService.getIdentity()
    this.category = new Category(1,'')
   }

  ngOnInit(): void {
  }

  onSubmit(categoryForm:any): void{
    this._categoryServiceProvider.create(this.token, this.category).subscribe(
      response =>{
        if (response.status == "success"){
          this.status = "success"
          this.category = response.category
          this._router.navigate(['./inicio'])
        }else{
          this.status = "error"
        }
      },
      error =>{
        this.status = "error"
        console.log(<any>error)
      }
    )
  }

}
