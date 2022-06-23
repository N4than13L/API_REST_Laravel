import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { userServiceProvider } from 'src/app/service/user.service';
import { global } from '../../service/global/global';


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
  public resetVar = true
  public url: any

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .jpeg, .gif",
    maxSize: "50",
    uploadAPI:  {
    url: global.url + "user/upload",
      headers: {
     "Authorization" : this._userService.getToken()
      },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: "sube tu foto de perfil"
  }

  constructor(private _userService: userServiceProvider) {
    this.title = "Edicion de perfil"
    this.user = new User(1, '', '', 'ROLE-USER', '', '', '', '')
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.url = global.url
  

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
            if(response.status == 'success'){
              this.status = 'success'

              if(response.changes.name){
                this.user.name = response.changes.name
              }

              if(response.changes.surname){
                this.user.surname = response.changes.surname
              }

              if(response.changes.email){
                this.user.email = response.changes.email
              }

              if(response.changes.description){
                this.user.description = response.changes.description
              }

              if(response.changes.image){
                this.user.image = response.changes.image
              }

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

  avatarUpload(datos: any){
    let data = JSON.parse(JSON.stringify(datos.response))
    this.user.image = data.image  
    console.log(datos.response) 
  }

}
