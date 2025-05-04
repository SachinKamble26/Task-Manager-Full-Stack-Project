import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MyServices/user.service';
import { UpdateProfile, UserProfile } from '../profile/profile.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  user:UserProfile=
   {
     userId: this.userService.userid,
     name: "",
     email: "",
     password:"" ,
     dob: "",
     mobileNo: "",
     address: "",
     role: "",
   }
 
 
   updateUserProfile:UpdateProfile=
   {
     name: this.user.name,
     email: this.user.email,
     password:this.user.password,
     dob: this.user.dob,
     mobileNo: this.user.mobileNo,
     address: this.user.address,
     role: this.user.role,
   }
 
   constructor(private userService:UserService,private router:Router,private toaster:ToastrService) 
   {
 
     this.getUser()
 
    }
 
   ngOnInit(): void {
   }
 
 getUser()
 {
   this.userService.getUser().subscribe((data)=>{console.log("get user response : ",data); this.user=data    },(error)=>{console.log("get user error : ",error.error)})
 }
 
 updateProfile(user:UserProfile)
 {
 
 
 
 
   console.log("admin profile updated",user)
 
 
   this.updateUserProfile.name=user.name
   this.updateUserProfile.email=user.email
   this.updateUserProfile.mobileNo=user.mobileNo
   this.updateUserProfile.address=user.address
   this.updateUserProfile.dob=user.dob
   this.updateUserProfile.role=user.role
   this.updateUserProfile.password=user.password




   
  if(this.updateUserProfile.name=="")
    {
    this.toaster.warning("Name is required!")
    }
    else if(this.updateUserProfile.email=="")
    {
        this.toaster.warning("Email is required!")
    }
    else if(this.updateUserProfile.mobileNo=="")
      {
          this.toaster.warning("Mobile no is required!")
      }
      else if(this.updateUserProfile.address=="")
        {
            this.toaster.warning("Address is required!")
        }
        else if(this.updateUserProfile.dob=="")
          {
              this.toaster.warning("Date of birth is required!")
          }
          else if(this.updateUserProfile.role=="")
            {
                this.toaster.warning("Role is required!")
            }
            else if(this.updateUserProfile.password=="")
              {
                  this.toaster.warning("Password is required!")
              }
              else
              {
        this.userService.updateUser(this.updateUserProfile,user.userId).subscribe((data)=>{console.log("update user response : ",data);  this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
     this.router.navigate([decodeURI("/adminProfile")])});            this.toaster.success("Admin profile updated successfully!");  },(error)=>{console.log("update user error : ",error.error)})
 
   }
 /**        this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
         this.router.navigate([decodeURI("/taskList")])); */
 }


}
