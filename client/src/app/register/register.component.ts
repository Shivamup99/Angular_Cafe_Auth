import { GlobalConstants } from './../shared/constant/global-constant';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnakbarService } from '../services/snack/snakbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnakbarService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      contact: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.contactRegex)],
      ],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit(){
    this.ngxService.start()
    const formData = this.signupForm.value;
    var data={
      name:formData.name,
      email:formData.email,
      contact:formData.contact,
      password:formData.password
    }
    this.userService.register(data).subscribe((response:any)=>{
      this.ngxService.stop()
      this.dialogRef.close()
      this.responseMessage=response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"")
      this.router.navigate(['/']);
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
