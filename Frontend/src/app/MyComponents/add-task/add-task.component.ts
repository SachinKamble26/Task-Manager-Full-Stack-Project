import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, TaskStructure } from 'src/app/MyServices/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { UserService } from 'src/app/MyServices/user.service';
import { AuthServiceService } from 'src/app/MyServices/auth-service.service';
import { ToastrService } from 'ngx-toastr';


export interface createTaskDTO
{
  title: string,
  description: string,
  dueDate: string,
  isCompleted: boolean,
  userId: number |undefined ,
  taskPriorityId:number
}







@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {


  selectedTime: string = '10:30';


 todayDate=new Date().toISOString().split('T')[0]

createTask:createTaskDTO =
{
  title: "",
  description: "",
  dueDate:new Date().toISOString().split('T')[0],
  isCompleted: false,
  userId: this.userService.getUseridFromLogInComponent(),
  taskPriorityId:3
}




  constructor(private taskService:TaskService,private router:Router,private userService: UserService,private authService:AuthServiceService,private toaster:ToastrService) 
  {
this.createTask.dueDate=new Date().toISOString().split('T')[0]

 this.createTask.userId=this.userService.getUseridFromLogInComponent();


 const id=this.authService.getUserId()


if(id)
{
  this.createTask.userId =parseInt(id);
}


  }

  ngOnInit(): void {
  }


  createNewTask(task:createTaskDTO ) 
  {


task.userId=this.userService.getUseridFromLogInComponent()

const id=this.authService.getUserId()


if(id)
{
  task.userId =parseInt(id);
}



console.log("new Date() is ",new Date())

    task.isCompleted=false
    

    console.log("Task Created :: ",task)
    console.log("Task Created dueDate :: ",task.dueDate)

      this.taskService.createTask(task)
      .subscribe((data)=>
        {console.log("Create Task Response : "+data);   this.toaster.success("Task is added succesfully!");

          console.log("selected time is : ",this.selectedTime)
        this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
        this.router.navigate([decodeURI("/taskList")]);
      });
        },(error)=>{console.log("Create Task Error : "+error);  this.toaster.warning("Due date cannot be past date. it should be equal or greater than current date!")});




      
      // this.router.navigateByUrl("/about").then(()=>
      // {
      //   this.router.navigateByUrl("")
      // })
  
    }

}
