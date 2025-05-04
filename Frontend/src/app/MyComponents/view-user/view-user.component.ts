import { Component, OnInit } from '@angular/core';
import { UserStructure } from '../user-list/user-list.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/MyServices/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  userId!:number 

/**
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


user:UserStructure=
{
  
    userId: 0,
    name: "",
    email: "",
    password: "",
    dob: "",
    mobileNo: "6518272819",
    address: "",
    role: "user"

}





  constructor(private route:ActivatedRoute,private userService : UserService) { }

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



}



getUser()
{

  this.userService.getUserInfo(this.userId).subscribe((data)=>{console.log("get user info respomnse : ",data);this.user=data},(error)=>{console.log("get user info error : ",error.error)})
}


}
