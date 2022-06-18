import { Component, OnInit, DoCheck } from '@angular/core';
import { userServiceProvider } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userServiceProvider]
})

export class AppComponent implements OnInit, DoCheck {
  title = 'Blog-angular';
  public identity: any
  public token: any

  constructor(public _userService: userServiceProvider){
    this.loginUser()
  }

  ngOnInit() {
    console.log("mensaje")
  }

  ngDoCheck(){
    this.loginUser()
  }

  loginUser(){
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }


}
