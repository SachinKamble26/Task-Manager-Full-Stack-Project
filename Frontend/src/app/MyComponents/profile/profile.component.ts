import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/MyServices/user.service';

/*
{
    "userId": 1,
    "name": "sachin pralhad kamble",
    "email": "sachin@gmail.com",
    "password": "sachin#123",
    "dob": "2025-04-07",
    "mobileNo": "5698238654",
    "address": "parbhani",
    "role": "user"
}
*/



export interface UserProfile
{
  userId: number | undefined;
  name: string;
  email: string;
  password: string;
  dob: string;
  mobileNo: string;
  address: string;
  role: string;
}

/*
{
  "name": "sachin",
  "email": "sachin@gmail.com",
  "password": "sachin#123",
  "dob": "2025-04-11",
  "mobileNo": "9876543228",
  "address": "pune",
  "role": "user"
} */

  export interface UpdateProfile
  {
   
    name: string;
    email: string;
    password: string;
    dob: string;
    mobileNo: string;
    address: string;
    role: string;
  }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


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




  console.log("profile updated",user)


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
    this.router.navigate([decodeURI("/profile")])});            this.toaster.success("User profile updated!");  },(error)=>{console.log("update user error : ",error.error)})

  }

/**        this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
        this.router.navigate([decodeURI("/taskList")])); */
}

}
