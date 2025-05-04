import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/MyServices/user.service';

/*
{
   "email": "abc@gmail.com",
  "mobileNo": "1234567890",
  "newPassword": "abc#123"
}
 */


/*
{
     "email": "abc@gmail.com",
  "dob": "2025-04-08",
  "newPassword": "abc#123"
}
 */

export interface ResetUsingDob
{
  email: string;
  dob: string;
  newPassword:string;
}


export interface ResetUsingMobileNo
{
  email: string;
  mobileNo: string;
  newPassword: string;
}






@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  email: string ="";
  mobileNo: string ="";
  dob: string = new Date().toISOString().split("T")[0];
  newPassword: string ="";
  confirmNewPassword:string=""

  selectedMethodNo:number=1

//---------------------------------------

resetUsingDobObj:ResetUsingDob=
{
  email: "",
  dob: "",
  newPassword: ""
}


resetUsingMobileNoObj:ResetUsingMobileNo=
{
  email: "",
  mobileNo: "",
  newPassword: ""
}






 constructor( private router:Router,private userService:UserService,private toaster:ToastrService) { }

  ngOnInit(): void {
  }



  //-------------------------------------------------------------------------------------------------------
  resetUserPassword()
  {



    if(this.email=="")
    {
  this.toaster.warning("Email is required!")
    }
    else if(this.newPassword=="")
    {
        this.toaster.warning("New password is required!")
    }else if(this.confirmNewPassword=="")
    {
        this.toaster.warning("Confirmation of new password is required!")
    }else if(this.newPassword!=this.confirmNewPassword)
    {
        this.toaster.warning("New password and Confirmed password are not matching!")
    }
    else
    {


      console.log(`email : ${this.email}`)
      console.log(`newPassword : ${this.newPassword}`)
      console.log(`confirmNewPassword : ${this.confirmNewPassword}`)
  //--------------------------------------------------------------------
      if(this.selectedMethodNo==1)
      {
  

        if(this.dob=="")
          {
              this.toaster.warning("Date of birth is required!")

          }
          else
          {

            this.resetUsingDobObj.dob=this.dob;
            this.resetUsingDobObj.email=this.email;
            this.resetUsingDobObj.newPassword=this.newPassword;


            console.log(`using dob : ${this.dob}`)
       
            //   this.toaster.warning("password reset using dob succesfull!");

            this.resetPasswordUsingDob(this.resetUsingDobObj);

          }


     
      }
      else if (this.selectedMethodNo==2)
      {

         if(this.mobileNo=="")
          {
              this.toaster.warning("Mobile no is required!")
         
          }else
          {

            this.resetUsingMobileNoObj.mobileNo=this.mobileNo;
            this.resetUsingMobileNoObj.email=this.email;
            this.resetUsingMobileNoObj.newPassword=this.newPassword;

            console.log(`using mobile no : ${this.mobileNo}`)
  
            //   this.toaster.warning("password reset using mobile no succesfull!")

            this.resetPasswordUsingMobileNo(this.resetUsingMobileNoObj);

          }
  
   
      }
      //-------------------------------------------------------------------



    }


  }
//---------------------------------------------------------------------------------------------------------




resetPasswordUsingDob(resetPasswordUsingDobObj:ResetUsingDob)
{
  this.userService.resetPasswordUsingDob(resetPasswordUsingDobObj).subscribe((data)=>{console.log("reset password using dob response : ",data);   this.toaster.warning(data.message);this.router.navigateByUrl("")},(error)=>{console.log("reset password using dob error : ",error);  this.toaster.warning(error.error)})
}



resetPasswordUsingMobileNo(resetPasswordUsingMobileNoObj:ResetUsingMobileNo)
{
  this.userService.resetPasswordUsingMobileno(resetPasswordUsingMobileNoObj).subscribe((data)=>{console.log("reset password using mobile no response : ",data);  this.toaster.warning(data.message);this.router.navigateByUrl("")},(error)=>{console.log("reset password using mobile no error : ",error);  this.toaster.warning(error.error)})
}




}
