import { Component, OnInit } from '@angular/core';
import { UserStructure } from '../user-list/user-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/MyServices/user.service';
import { ToastrService } from 'ngx-toastr';





export interface  UpdateUserStructure
{
  
  
    name:string;
    email: string;
    password:string;
    dob: string;
    mobileNo: string;
    address: string;
    role: string;

}




@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

 userId!:number 

/** get user
 * {
    "userId": 7,
    "name": "Ganesh Gaitonde",
    "email": "ganesh@gmail.com",
    "password": "ganesh#123",
    "dob": "2025-05-02",
    "mobileNo": "6518272819",
    "address": "123",
    "role": "user"
}
 */


/** update user
 * 
 * {
  "name": "sachin",
  "email": "sachin@gmail.com",
  "password": "sachin#123",
  "dob": "2025-04-11",
  "mobileNo": "9876543228",
  "address": "pune",
  "role": "user"
}
 */


user:UserStructure=
{
  
    userId: 0,
    name: "",
    email: "",
    password: "",
    dob: "",
    mobileNo: "",
    address: "",
    role: "user"

}



updateUser:UpdateUserStructure=
{
  
  
    name: "",
    email: "",
    password: "",
    dob: "",
    mobileNo: "",
    address: "",
    role: "user"

}



  constructor(private route:ActivatedRoute,private userService : UserService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>
      {
      
        
        const userIdParam=params.get("userId")
      
        if( userIdParam!=null)
        {
         
          this.userId=+userIdParam
        }else
        {
          console.log("error : to edit user userid is null")
        }
      
  });



this.getUser();

console.log(" in edit user ctor : ")
console.log(this.user)

}



getUser()
{

  this.userService.getUserInfo(this.userId).subscribe((data)=>{console.log("get user info respomnse : ",data);this.user=data},(error)=>{console.log("get user info error : ",error.error)})



}


editUser(user:UserStructure)
{


if(   this.user.name=="")
{
  this.toaster.warning("Name is required!")
}
 else if(  this.user.email=="")
 {
    this.toaster.warning("Email is required!")
 }
else if (   this.user.mobileNo=="")
{
    this.toaster.warning("Mobile no is required!")
}
 else if( this.user.address=="")
 {
    this.toaster.warning("Address is required!")
 }
 else if( this.user.dob=="")
 {
    this.toaster.warning("Date of birth is required!")
 }else
 {

  this.updateUser.name=this.user.name
  this.updateUser.email=this.user.email
  this.updateUser.mobileNo=this.user.mobileNo
  this.updateUser.address=this.user.address
  this.updateUser.dob=this.user.dob
  this.updateUser.role=this.user.role
  this.updateUser.password=this.user.password
  
  this.userService.updateUser(user,user.userId).subscribe((data)=>{console.log("edit user data : ",data); this.router.navigateByUrl("/adminPage"); this.router.navigateByUrl("/userList");    this.toaster.success("user updated succesfully");},(error)=>{console.log("edit user error : ",error)})
  
 }










}






}
