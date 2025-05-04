import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private router:Router ,private toaster:ToastrService ) { }

  ngOnInit(): void {
  }



  home()
  {
    this.router.navigateByUrl("/adminPage")
  }

  goToProfile()
  {

this.router.navigateByUrl("/adminProfile")
    

  }


  logOut()
  {

    const confirmed = window.confirm("Are you sure you want to log out?");

    if(confirmed)
    {
      localStorage.removeItem('token');
      this.router.navigateByUrl("");
        this.toaster.success("Admin logged out succesfully !")
    }

 
  }




}
