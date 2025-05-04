import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MyServices/user.service';
import { UserStructure } from '../user-list/user-list.component';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/MyServices/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {



   adminsList:UserStructure[]=[]

  constructor(public userService : UserService,private router:Router,private authService:AuthServiceService,private toaster:ToastrService) { }

  ngOnInit(): void 
  {

    this.getAdminList()


    const id=this.authService.getUserId()

    if(id)
    {
      this.userService.userid= parseInt(id)
    }
  


  }


getAdminList()
{
  this.userService.getAdminList().subscribe((data)=>{console.log("Get Admin list response : ",data);this.adminsList=data.map((admin)=>{return admin})},(error)=>{console.log("Get Admin list error : ",error.error)})
}




deleteAdmin(userid:number)
{

  //   this.toaster.warning(`admin deleted admin id : ${userid}`);

if(userid== this.userService.getUseridFromLogInComponent())
{
    this.toaster.warning(`Currently logged in admin cannot be deleted!`);
}else
{
 this.userService.deleteUser(userid).subscribe((data)=>{console.log("Delete Admin  response : ",data);   this.getAdminList();    this.toaster.success("Admin Deleted Succesfuly!");      this.router.navigateByUrl("/adminPage")
  this.router.navigateByUrl("/adminList")    },(error)=>{console.log("Delete Admin error : ",error.error);  this.toaster.warning("Admin deletion fails!")})


}


 

}



}
