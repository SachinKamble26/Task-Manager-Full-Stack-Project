import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './MyComponents/task-list/task-list.component';
import { ViewTaskComponent } from './MyComponents/view-task/view-task.component';
import { AddTaskComponent } from './MyComponents/add-task/add-task.component';
import { AboutComponent } from './MyComponents/about/about.component';
import { EditTaskComponent } from './MyComponents/edit-task/edit-task.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { FilterTaskComponent } from './MyComponents/filter-task/filter-task.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { RegisterComponent } from './MyComponents/register/register.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { AdminPageComponent } from './MyComponents/admin-page/admin-page.component';
import { AdminLayoutComponent } from './Layouts/admin-layout/admin-layout.component';
import { UserListComponent } from './MyComponents/user-list/user-list.component';
import { AddUserComponent } from './MyComponents/add-user/add-user.component';
import { AdminProfileComponent } from './MyComponents/admin-profile/admin-profile.component';
import { AdminListComponent } from './MyComponents/admin-list/admin-list.component';
import { AddAdminComponent } from './MyComponents/add-admin/add-admin.component';
import { AssignTaskToUserComponent } from './MyComponents/assign-task-to-user/assign-task-to-user.component';
import { ViewUserComponent } from './MyComponents/view-user/view-user.component';
import { ViewAdminComponent } from './MyComponents/view-admin/view-admin.component';
import { EditUserComponent } from './MyComponents/edit-user/edit-user.component';
import { EditAdminComponent } from './MyComponents/edit-admin/edit-admin.component';
import { ResetPasswordComponent } from './MyComponents/reset-password/reset-password.component';
import { SetReminderComponent } from './MyComponents/set-reminder/set-reminder.component';

const routes: Routes = 
[


{
  path:'',
  component:AuthLayoutComponent,
  children:
  [
    {path:"",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"resetPassword",component:ResetPasswordComponent},
  ]
},
{
  path:'',
  component:MainLayoutComponent,
  children:
  [
    {path:"taskList",component:TaskListComponent},
    {path:"viewTask/:taskId/:userId",component:ViewTaskComponent},
    {path:"addTask",component:AddTaskComponent},
    {path:"about",component:AboutComponent},
    {path:"filterTask",component:FilterTaskComponent},
    { path: 'editTask/:taskId/:userId', component: EditTaskComponent },
    {path:"home",component:HomeComponent},
    {path:"profile",component:ProfileComponent},
    {path:"setReminder/:title/:taskId/:userId",component:SetReminderComponent}
  

  ]
},
{
  path:'',
  component:AdminLayoutComponent,
  children:
  [

    {path:"adminPage",component:AdminPageComponent},
    {path:"userList",component:UserListComponent},
    {path:"addUser",component:AddUserComponent},
    {path:"adminProfile",component:AdminProfileComponent},
    {path:"adminList",component:AdminListComponent},
    {path:"addAdmin",component:AddAdminComponent},
    {path:"assignTask/:userId",component:AssignTaskToUserComponent},
    {path:"viewUser/:userId",component:ViewUserComponent},
    {path:"viewAdmin/:userId",component:ViewAdminComponent},
    {path:"editUser/:userId",component:EditUserComponent},
    {path:"editAdmin/:userId",component:EditAdminComponent},

  ]
}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
