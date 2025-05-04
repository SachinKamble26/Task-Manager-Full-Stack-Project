import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router ,private toaster:ToastrService ) { }

  ngOnInit(): void {
  }



  goToProfile()
  {
this.router.navigateByUrl("/profile")
  }

  home()
  {
    this.router.navigateByUrl("/home")
  }



  logOut()
  {

    const confirmed = window.confirm("Are you sure you want to log out?");

    if(confirmed)
    {

      localStorage.removeItem('token');
      this.router.navigateByUrl("");
        this.toaster.success("User logged out succesfully !")
    }

  }




}
