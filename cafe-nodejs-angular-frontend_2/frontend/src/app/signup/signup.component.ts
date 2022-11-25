import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { SnackbarService } from '../snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatDialogRef } from '@angular/material/dialog';
//import { NgxUiLoaderService } from 'ngx-ui-loader/public-api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupform:any =FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder, private router:Router,
    private UserService:UserService,
    private  SnackbarService: SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>
  //  private ngxService:NgxUiLoaderService,
  )
     { }

  ngOnInit(): void {

    this.signupform =this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumebrRegex)]],
      password:[null,[Validators.required]],
     
    })

 
  }
  handleSubmit()
  {  
    //this.ngxService.start();
    var formData =this.signupform.value;
    var data ={
name: formData.name,
email: formData.email,
contactNumber: formData.contactNumber,
password: formData.password
    }
//calling api signup
    this.UserService.signup(data).subscribe((response:any)=>{
      //this.ngxService.stop(),
  this.dialogRef.close(),
  this.responseMessage=response?.message;
  this.SnackbarService.openSnackBar(this.responseMessage,"");
  this.router.navigate(['/']);
    },(error)=>{
            //this.ngxService.stop();
            if(error.error?.message)
            {
              this.responseMessage=error.error?.message;
            }
            else{
              this.responseMessage=GlobalConstants.genericError;
            }
            this.SnackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);


    })
  }
}
