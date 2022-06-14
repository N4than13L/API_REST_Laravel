import { Component, OnInit } from '@angular/core';
import { userServiceProvider } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [userServiceProvider]
})

export class RegisterComponent implements OnInit {
  public title: string
  public user: User
  public status: string = ""
  public registerForm: any

  constructor(
    private userProvider: userServiceProvider
  ) { 
    this.title = "Registrate"
    this.user = new User(1, '', '', 'ROLE-USER', '', '', '', '')
    
  }

  ngOnInit(): void {
    console.log(this.userProvider.test())
  }

  onSubmit(registerForm: any){
   this.userProvider.register(this.user).subscribe(
      response =>{
        if (response.status == "success"){
          this.status = response.status 
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
