import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/MyServices/user.service';



/**
 * {
  "name": "mahesh",
  "email": "mahesh@gmail.com",
  "password": "mahesh#123",
  "dob": "2001-01-26",
  "mobileNo": "1728288897",
  "address": "nanded",
  "role": "user"
}
 */

export interface RegisterUser
{
  name: string,
  email: string,
  password: string,
  dob: string,
  mobileNo: string,
  address: string,
  role: string
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

confirmPassword:string=""

  registeredUser:RegisterUser=
  {
    name: "",
    email: "",
    password:"",
    dob: new Date().toISOString().split("T")[0],
    mobileNo: "",
    address: "",
    role: "user"
  }


  constructor(private userService:UserService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void 
  {
  
  
  }

  register(user:RegisterUser)
  {
   
  

if(user.name=="")
{
  this.toaster.warning("Name is required!")
}
else if(user.email=="")
{
    this.toaster.warning("Email is required !")
}
else if(user.password=="")
  {
      this.toaster.warning("Password is required !")
  }
  else if(user.password!=this.confirmPassword)
    {
        this.toaster.warning("Password is not matching with confirmed password!")
    }
  else if(user.dob=="")
    {
        this.toaster.warning("Date of Birth is required !")
    }
    else if(user.mobileNo=="")
      {
          this.toaster.warning("Mobile No is required !")
      }
      else if(user.address=="")
        {
            this.toaster.warning("Address is required !")
        }
      else 
        {
          this.userService.registerUser(user).subscribe((data)=>{console.log("register user response : ",data);    this.toaster.success("User registered succesfully. Please log in to continue !");this.router.navigateByUrl("")},(error)=>{console.log("register user error : ",error.error);    this.toaster.warning("User registeration fails. Please try again !")})
  
  
        }
      

   
  
  
  }


}
