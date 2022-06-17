import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router"
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
  public status: string = " "
  public token: any
  public identity: any

  constructor( private _userService: userServiceProvider,
    public _router: Router, public _route: ActivatedRoute) {
    this.title = "Identificate"
    this.user = new User(1, '', '', 'ROLE-USER', '', '', '', '')
   }

  ngOnInit(): void {
    this.logout()
  }

  onSubmit(form: any){
    this._userService.signup(this.user).subscribe(
      // obtener token.
      response =>{
        if (response.status != 'error') {
          this.status = 'success'
          this.token = response

          // objeto de usuario identificado. 
          this._userService.signup(this.user, true).subscribe(
            response =>{
              this.identity = response

              // persidir usuario en el almacenamiento local.
              console.log(this.token)
              console.log(this.identity)

              localStorage.setItem('token', this.token)
              localStorage.setItem('identity', JSON.stringify(this.identity))

              this._router.navigate(['inicio'])
            
            },
            error =>{
              this.status = 'error'
              console.log(<any>error)
            }
          )

        }else{
          this.status = 'error'
        }
      },
      error =>{
        this.status = 'error'
        console.log(<any>error)
      }
    )
  }

  logout(){
    this._route.params.subscribe(params =>{
      let logout =+ params['sure']

      if(logout == 1){
        localStorage.removeItem('identity')
        localStorage.removeItem('token')
        
        this.identity = null
        this.token = null

        this._router.navigate(['inicio'])

      }
    })
  }

}
