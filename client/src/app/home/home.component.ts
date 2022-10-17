import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoginComponent } from './../login/login.component';
import { RegisterComponent } from './../register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
      if(localStorage.getItem('token')!=null){
         this.userService.checkToken().subscribe((response:any)=>{
          this.router.navigate(['/cafe/dasboard'])
         },(error)=>{
          console.log(error)
         })
      }
  }

  signupAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width ="600px"
    this.dialog.open(RegisterComponent,dialogConfig)
  }

  loginAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width="550px"
    this.dialog.open(LoginComponent,dialogConfig)
  }

}
