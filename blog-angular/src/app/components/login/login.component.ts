import { Component, OnInit } from '@angular/core';
import { userServiceProvider } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [userServiceProvider]
})

export class LoginComponent implements OnInit {
  public title: string
  public user: User
  public status: string = ""
  public token: any
  public identity: any

  constructor( public _userService: userServiceProvider) {
    this.title = "Identificate"
    this.user = new User(1, '', '', 'ROLE-USER', '', '', '', '')
   }

  ngOnInit(): void {

  }

  onSubmit(form: any){
    this._userService.signup(this.user).subscribe(
      response =>{
        // token.
        if(response.status != "error"){
          this.status = "success"
          this.token = response

          // objeto del usuario identificado.
          this._userService.signup(this.user).subscribe(
            response =>{
              // token.
                this.identity = response 
                console.log(this.token)
                console.log(this.identity)
            },
            error =>{
              this.status = "error"
              console.log(<any>error)
            }
          )

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
