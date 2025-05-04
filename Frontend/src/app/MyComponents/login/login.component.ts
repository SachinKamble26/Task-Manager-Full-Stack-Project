import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/MyServices/auth-service.service';
// import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/MyServices/user.service';



export interface User
{
email:string;
password:string;
}

export interface UserLoginResponse
{
  id:  number;
  role: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{


user:User=
{
  email:"",
  password:""
}


userLoggedinResponse:UserLoginResponse=
{
  id: 0,
  role:""
}

// userid:any

  constructor( private userService:UserService,private toaster:ToastrService,private router:Router ,private authservice:AuthServiceService) { }

  ngOnInit(): void {
  }


  logIn(user:User)
  {

    if(user.email=="")
    {
//   this.toaster.warning("Email is required!")
this.toaster.warning("Email is required!")
    }else if(user.password=="")
    {
  this.toaster.warning("Password is required!")
    }else
    {
      this.userService.LogInUser(user).subscribe((data)=>{console.log("log in data : ",data);
        
        console.log(" log data as token ",data)
        console.log(" log as data.token ",data.token)
        
        
        const token=data.token;

        localStorage.setItem("token",token);


        
        const id = this.authservice.getUserId() ;
        const role = this.authservice.getUserRole() ;    // handle this properly
       


        if(id && role)
        {
          this.userLoggedinResponse.id= parseInt(id);
          this.userLoggedinResponse.role=role
        }
      


        this.userService.passuseridToUserservice(  this.userLoggedinResponse.id   );   
        
        
        if(this.userLoggedinResponse.role=="user" || this.userLoggedinResponse.role=="User"   )
        {
          this.router.navigateByUrl("/taskList") ;  
          // window.alert('User Login Successful!')
           this.toaster.success('User Login Successful!');  
        }else if(this.userLoggedinResponse.role=="Admin"   || this.userLoggedinResponse.role=="admin")
        {
          this.router.navigateByUrl("/adminPage")
          // window.alert('Admin Login Successful!')  
           this.toaster.success('Admin Login Successful!');  
        }else
        {
          // window.alert("user has no role!")
          this.toaster.warning("user has no role!")
        }


       },(error)=>{ console.log( "Log in error : ",error.error); 
        // window.alert('Invalid username or password. Please try again !');
        this.toaster.warning("Invalid username or password. Please try again !")
      
      })
 
    }

     
    // this.toastrService.success(`Logged In Succesfully`) 
  
  }

  getUserId():number
  {
    return this.userLoggedinResponse.id;
  }


}

