import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceService } from './MyServices/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,private authService:AuthServiceService) {}


  //----------------------------------------------------------------------------
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {

    // for below urls dont check is token avialable just forward request to backend 
    if (req.url==="https://localhost:7127/TaskManagement/Auth/login"  ||  req.url==="https://localhost:7127/TaskManagement/User/registerUser" || req.url=="https://localhost:7127/TaskManagement/User/resetPasswordUsingDob" || req.url==="https://localhost:7127/TaskManagement/User/resetPasswordUsingMobileno"  ) 
    {
      return next.handle(req);
    }




  const token=localStorage.getItem('token');

  if(token)
  {
     const clonedReq =req.clone({setHeaders:{Authorization: `Bearer ${token}`}})
   

    return next.handle(clonedReq)
    .pipe
    (
      catchError
      (
        (error: HttpErrorResponse) => 
        {

        //  window.alert(`in interceptor error status code is -  ${error.status}`)

        if (error.status === 401 ) // means token is expired
        {
         
          window.alert("Your session has expired. Please log in again!"); 
           localStorage.removeItem('token'); // Remove expired token
           this.router.navigateByUrl(""); 

         
        }
      
           return throwError(() => error);
      

       
        }
      )
    );
  }
else 
{
  window.alert('Token not found. Please log in again!');
  localStorage.removeItem('token');
  this.router.navigateByUrl(''); // Update to actual login route
  return EMPTY; // Prevent request from being sent
}
  
  // return next.handle(req);

}
//-------------------------------------------------------------------------------------------------------



}
