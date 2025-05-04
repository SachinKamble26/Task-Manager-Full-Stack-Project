import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../register/register.component';
import { UserService } from 'src/app/MyServices/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

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
  
  public  confirmPassword:string=""
  
  
  
  
  
    constructor(private userService:UserService,private router:Router,private toaster:ToastrService) { }
  
    ngOnInit(): void {
    }
  
  
    addUser(user:RegisterUser)
    {
       if(user.password!==this.confirmPassword)
        {
          //   this.toaster.warning(`passwords are not matching!`)
          this.toaster.warning("passwords are not matching!")
        }
        
      else if( user.name=="")
          {
            this.toaster.warning("Name is required!")
          }
           else if(user.email=="")
           {
              this.toaster.warning("Email is required!")
           }
          else if (  user.mobileNo=="")
          {
              this.toaster.warning("Mobile no is required!")
          }
           else if( user.address=="")
           {
              this.toaster.warning("Address is required!")
           }
           else if(user.dob=="")
           {
              this.toaster.warning("Date of birth is required!")
           }
           else if(user.password=="")
            {
               this.toaster.warning("password is required!")
            }
         else
      {
        console.log(user)
        this.userService.addAdmin(user).subscribe((data)=>{console.log("add admin response : ",data);  this.toaster.success("Admin added succesfully!");this.router.navigateByUrl("/adminList")       },(error)=>{console.error("add user error : ",error.error)})
    
    
      }

 
 
      }

}
