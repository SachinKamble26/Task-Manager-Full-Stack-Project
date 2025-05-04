import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './MyComponents/task-list/task-list.component';
import { AddTaskComponent } from './MyComponents/add-task/add-task.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ViewTaskComponent } from './MyComponents/view-task/view-task.component';
import { EditTaskComponent } from './MyComponents/edit-task/edit-task.component';
import { AboutComponent } from './MyComponents/about/about.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './MyComponents/login/login.component';
import { FilterTaskComponent } from './MyComponents/filter-task/filter-task.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { RegisterComponent } from './MyComponents/register/register.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { AdminPageComponent } from './MyComponents/admin-page/admin-page.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { EditUserComponent } from './MyComponents/edit-user/edit-user.component';
import { AdminLayoutComponent } from './Layouts/admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './MyComponents/admin-navbar/admin-navbar.component';
import { UserListComponent } from './MyComponents/user-list/user-list.component';
import { AddUserComponent } from './MyComponents/add-user/add-user.component';
import { AdminProfileComponent } from './MyComponents/admin-profile/admin-profile.component';
import { AdminListComponent } from './MyComponents/admin-list/admin-list.component';
import { AddAdminComponent } from './MyComponents/add-admin/add-admin.component';
import { ViewAdminComponent } from './MyComponents/view-admin/view-admin.component';
import { ViewUserComponent } from './MyComponents/view-user/view-user.component';
import { AssignTaskToUserComponent } from './MyComponents/assign-task-to-user/assign-task-to-user.component'; 
import { AuthInterceptor } from './auth.interceptor';
import { EditAdminComponent } from './MyComponents/edit-admin/edit-admin.component';
import { ResetPasswordComponent } from './MyComponents/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SetReminderComponent } from './MyComponents/set-reminder/set-reminder.component';




@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddTaskComponent,
    ViewTaskComponent,
    EditTaskComponent,
    AboutComponent,
    LoginComponent,
    FilterTaskComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    AdminPageComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    EditUserComponent,
    AdminLayoutComponent,
    AdminNavbarComponent,
    UserListComponent,
    AddUserComponent,
    AdminProfileComponent,
    AdminListComponent,
    AddAdminComponent,
    ViewAdminComponent,
    ViewUserComponent,
    AssignTaskToUserComponent,
    EditAdminComponent,
    ResetPasswordComponent,
    SetReminderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // require for animation
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // or 'toast-bottom-right', 'toast-top-full-width', etc.
      preventDuplicates: false, // Prevent duplicate toasts
      timeOut: 3000, // Auto close after 3 seconds
      closeButton: true, // Optional: Show close button on toasts
      progressBar: true, // Optional: Show progress bar
    }),  // 👈 global toastr config
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   
     NgxMaterialTimepickerModule,  // -- first add packages of it then it will work
 
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
