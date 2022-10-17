import { SnakbarService } from './../services/snack/snakbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../shared/constant/global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginForm:any = FormGroup;
   responseMessage:any;

  constructor(private formBuilder:FormBuilder, private router:Router,private userService:UserService,
     public dialogRef:MatDialogRef<LoginComponent>,private ngxService:NgxUiLoaderService,private snackbarService:SnakbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      password:[null,[Validators.required]]
    })
  }

  handleSubmit(){
    this.ngxService.start()
    const formData = this.loginForm.value;
    var data={
      email:formData.email,
      password:formData.password
    }
    this.userService.login(data).subscribe((response:any)=>{
      this.ngxService.stop()
      this.dialogRef.close()
      localStorage.setItem('token',response.token)
      this.responseMessage=response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"")
      this.router.navigate(['/cafe/dashboard']);
    },(error)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      } else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
