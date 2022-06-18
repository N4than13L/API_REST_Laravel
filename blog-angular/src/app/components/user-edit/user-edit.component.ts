import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { userServiceProvider } from 'src/app/service/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [userServiceProvider]
})

export class UserEditComponent implements OnInit {
  public title: string
  public user: User
  public token: any
  public identity: any
  public status: any 

  constructor(private _userService: userServiceProvider) {
    this.title = "Edicion de perfil"
    this.user = new User(1, '', '', 'ROLE-USER', '', '', '', '')
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()

  this.user = this.user
    this.user = new User(
      this.identity.sub, 
      this.identity.name, 
      this.identity.surname, 
      this.identity.role,
      this.identity.email, '',
      this.identity.description,
      this.identity.image
      )

   }

  ngOnInit(): void {

  }
  onSubmit(form: any){
    this._userService.update(this.token, this.user).subscribe(
        response => {
            if(response && response.status){
              this.status = 'success'
              console.log(response)

              this.identity = this.user
              localStorage.setItem('identity', JSON.stringify(this.identity))

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

}
