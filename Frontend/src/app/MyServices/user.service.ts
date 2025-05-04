// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { User } from '../MyComponents/login/login.component';
// import { Observable } from 'rxjs';


// /**
//   {
//   "email": "abc@gmail.com",
//   "password": "abc#123"
// }
//  */




// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {



// userid:number | undefined
//   constructor( private http:HttpClient ) { }

// // https://localhost:7127/TaskManagement/User/authenticateUser

// LogInUser(user:User):Observable<any>
// {
//  return this.http.post("https://localhost:7127/TaskManagement/User/authenticateUser",user)
// }


// passuseridToUserservice(userid:number)
// {
//   this.userid=userid;
// }


// getUseridFromLogInComponent()
// {
//   return this.userid;
// }



// }

//-------------------------------------------------------------------------------------------------------------------

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../MyComponents/login/login.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UpdateProfile } from '../MyComponents/profile/profile.component';
import { RegisterUser } from '../MyComponents/register/register.component';
import { UserStructure } from '../MyComponents/user-list/user-list.component';
import { AuthServiceService } from './auth-service.service';
import { ResetUsingDob, ResetUsingMobileNo } from '../MyComponents/reset-password/reset-password.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  public filterListId:number=0

  public userid:  number | undefined ;

  constructor(private http: HttpClient,private authService:AuthServiceService) { }

  // Login function
  // LogInUser(user: User): Observable<any> {
  //   return this.http.post("https://localhost:7127/TaskManagement/Auth/login", user)
  //     .pipe(
  //       tap((response: any) => {
  //         // Assuming that the response has a 'userid' field
  //         if (response && response.userid) {
  //           this.passuseridToUserservice(response.userid);
  //         } else {
  //           console.error("User ID not found in login response");
  //         }
  //       })
  //     );
  // }




  LogInUser(user:User):Observable<any>
{
 return this.http.post("https://localhost:7127/TaskManagement/Auth/login",user)
}



  // Set the userid
  passuseridToUserservice(userid: number): void {

    console.log(" in  passuseridToUserservice userid is :  ",userid)

    this.userid = userid;

    const id=this.authService.getUserId()
    const role=this.authService.getUserRole()

    if(id && role)
    {
      this.userid =parseInt(id);
    }

  
  }

  // Retrieve the userid
  getUseridFromLogInComponent(): number | undefined 
  {
    console.log(" in getUseridFromLogInComponent of user service this.userid ")

   
      const id=this.authService.getUserId()
      const role=this.authService.getUserRole()
  
      // here it below check that id and role are not null,undefined,0,false -- this is typescript and javscript feature
   
      if(id && role)   
      {
        this.userid =parseInt(id);
      }
    

    return this.userid;
  }






// https://localhost:7127/TaskManagement/User/getUser?userId=1


getUser():Observable<any>
{


  const id=this.authService.getUserId()
  const role=this.authService.getUserRole()

  if(id && role)  // here it chacek that id and role are not null,undefined,0,false -- this is typescript and javscript feature
  {
    this.userid =parseInt(id);
  }
  



  return this.http.get(`https://localhost:7127/TaskManagement/User/getUser?userId=${this.userid}`)

}


// https://localhost:7127/TaskManagement/User/updateUser?userId=1

updateUser(user: UpdateProfile,userId:number  | undefined ):Observable<any>
{
  return this.http.patch(`https://localhost:7127/TaskManagement/User/updateUser?userId=${userId}`,user)
}



// https://localhost:7127/TaskManagement/User/registerUser

registerUser(user:RegisterUser):Observable<any>
{
  return this.http.post("https://localhost:7127/TaskManagement/User/registerUser",user)
}


getUserList():Observable<UserStructure[]>
{
return this.http.get<UserStructure[]>(`https://localhost:7127/TaskManagement/User/getUserList`)
}




// view
// https://localhost:7127/TaskManagement/User/getUser?userId=7

getUserInfo(userid:number):Observable<any>
{
  return this.http.get(`https://localhost:7127/TaskManagement/User/getUser?userId=${userid}`)

}

// update


// delete
// https://localhost:7127/TaskManagement/User/deleteUser?userId=4

deleteUser(useridtodelete:number):Observable<any>
{

  console.log("in deleteUser : ",useridtodelete)
  return this.http.delete(`https://localhost:7127/TaskManagement/User/deleteUser?userId=${useridtodelete}`)

}







// https://localhost:7127/TaskManagement/User/getAdminList

getAdminList():Observable<UserStructure[]>
{
  return this.http.get<UserStructure[]>("https://localhost:7127/TaskManagement/User/getAdminList")
}



// https://localhost:7127/TaskManagement/User/getUserName?userId=1


getUserName(userId:number):Observable<string>
{
  return this.http.get<string>(`https://localhost:7127/TaskManagement/User/getUserName?userId=${userId}`)
}


// https://localhost:7127/TaskManagement/User/addAdmin


addAdmin(user:RegisterUser):Observable<any>
{
  return this.http.post("https://localhost:7127/TaskManagement/User/addAdmin",user)
}



// https://localhost:7127/TaskManagement/User/resetPasswordUsingDob



resetPasswordUsingDob(resetPasswordUsingDobObj:ResetUsingDob):Observable<any>
{
return this.http.patch("https://localhost:7127/TaskManagement/User/resetPasswordUsingDob",resetPasswordUsingDobObj)
}

// https://localhost:7127/TaskManagement/User/resetPasswordUsingMobileno

resetPasswordUsingMobileno(resetPasswordUsingMobileNoObj:ResetUsingMobileNo):Observable<any>
{
  return this.http.patch("https://localhost:7127/TaskManagement/User/resetPasswordUsingMobileno",resetPasswordUsingMobileNoObj)
}





































}
