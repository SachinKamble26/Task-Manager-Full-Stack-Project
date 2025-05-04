import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/MyServices/user.service';




export interface UserStructure
{
  userId: number;
  name: string;
  email: string;
  password: string;
  dob: string;
  mobileNo:string ;
  address: string;
  role: string;
}


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersList:UserStructure[]=[]

  user:UserStructure=
  {
    userId: 0,
    name: "",
    email: "",
    password: "",
    dob: "",
    mobileNo:"",
    address: "",
    role: "",
  }

  constructor(private userService:UserService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void 
  {
    this.getUserList()
  }




getUserList()
{
  this.userService.getUserList()

  .subscribe(
    (data) => {
      this.usersList = data.map((user) => {
        
        return user;
      });
    },
    (error) => {
      console.error("Error while fetching tasks for user", error);
    }
  );
}











getUserInfo(userid:number)
{
  this.userService.getUserInfo(userid)

  .subscribe(
    (data) => {
      this.user=data
      console.log("response while fetching user info using userid ", data);

      


    },
    (error) => {
      console.error("Error while fetching user info using userid ", error);
    }
  );
}





deleteUser(userid:number)
{
  
  this.userService.deleteUser(userid)

  .subscribe(
    (data) => {
     
      console.log("response while deleting user info using userid ", data);

      
this.getUserList()
        this.toaster.success("User deleted succesfully!")

      this.router.navigateByUrl("/adminPage")
      this.router.navigateByUrl("/userList")

    },
    (error) => {
      console.error("Error while deleting user info using userid ", error);
    }
  );








}



}
