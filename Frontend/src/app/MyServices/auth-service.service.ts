import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }


  getToken()
  {
    return localStorage.getItem("token");
  }



  getDecodedToken()
  {
    const token=this.getToken()
if(token)
{
  return jwtDecode(token)
}else
{
  return null;
}

 }



getUserId(): string | null
{
const decoded:any=this.getDecodedToken();
return decoded ? decoded.userId : null;
}



getUserRole():string |  null
{
const decoded:any=this.getDecodedToken();
return decoded ? decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;
}


}
