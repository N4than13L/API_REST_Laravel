import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router"
import { userServiceProvider } from 'src/app/service/user.service';
import { CategoryServiceProvider } from 'src/app/service/category.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [userServiceProvider, CategoryServiceProvider]
})

export class PostNewComponent implements OnInit {
  public title: string
  public identity: any
  public token: any
  public post: any

  constructor(private _userService: userServiceProvider, 
    private _categoryServiceProvider: CategoryServiceProvider,
    private _route: ActivatedRoute,
    private _router: Router ) { 
    this.title = "Crear una nueva entrada"
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '','', '', null)
    console.log(this.post)
  }

}
