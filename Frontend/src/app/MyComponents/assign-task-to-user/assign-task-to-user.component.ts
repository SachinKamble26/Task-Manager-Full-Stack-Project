import { Component, OnInit } from '@angular/core';
import { createTaskDTO } from '../add-task/add-task.component';
import { TaskService } from 'src/app/MyServices/task.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/MyServices/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-task-to-user',
  templateUrl: './assign-task-to-user.component.html',
  styleUrls: ['./assign-task-to-user.component.css']
})
export class AssignTaskToUserComponent implements OnInit {
  

  selectedTime:string='10:30'

 userId!:number


 name!:string

 todayDate=new Date().toISOString().split('T')[0]
 
 createTask:createTaskDTO =
 {
   title: "",
   description: "",
   dueDate:new Date().toISOString().split('T')[0],
   isCompleted: false,
   userId: this.userService.userid,
   taskPriorityId:3
 }
 
 
 
 
   constructor(private taskService:TaskService,private router:Router,private userService: UserService,private route:ActivatedRoute,private toaster:ToastrService) 
   {
 this.createTask.dueDate=new Date().toISOString().split('T')[0]
   }
 
   ngOnInit(): void {


  

    this.route.paramMap.subscribe(params=> {
      const id=params.get("userId");       
      
      
      if(id!=null)
      {
        this.userId=+id;
      }else
      {
        console.log(" userid came from useelist component to assign task is null")
      }

      //   this.toaster.warning(` user id to assign task is :${this.userId} `)

      this.getUserName(this.userId)
   })

   }
 
 
   assignNewTask(task:createTaskDTO ) 
   {
 
 
 task.userId=this.userId
 
 console.log("new Date() is ",new Date())
 
     task.isCompleted=false
     
 
     console.log("Task assigned :: ",task)
     console.log("Task assigned dueDate :: ",task.dueDate)
 
       this.taskService.createTask(task)
       .subscribe((data)=>
         {console.log("Assign Task Response : "+data);
             this.toaster.success("Task is assigned succesfully!");
           console.log("selected time is : ",this.selectedTime);
         this.router.navigateByUrl('/adminPage', { skipLocationChange: true }).then(() => {
         this.router.navigate([decodeURI("/userList")]);
       });
         },(error)=>{console.log("assign Task Error : "+error);  this.toaster.warning("Due date cannot be past date. it should be equal or greater than current date!")});
 
 
 
 
       
       // this.router.navigateByUrl("/about").then(()=>
       // {
       //   this.router.navigateByUrl("")
       // })
   
     }
 


     getUserName(userId:number)
     {
      this.userService.getUserName(userId).subscribe((data)=>{console.log("assign Task response : "+data);this.name=data},(error)=>{console.log("get user name  Error : "+error)})
     }





     




}
