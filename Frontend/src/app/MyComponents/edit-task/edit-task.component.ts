import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService, TaskStructure } from 'src/app/MyServices/task.service';



export interface editTask 
{
     title: string,
   description: string,
   dueDate: string,
   isCompleted: boolean,
   userId: number,
   taskPriorityId: number
}






@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})


// {
//   "title": "title 5 updated",
//   "description": "description 5 updated",
//   "dueDate": "2025-04-08T07:19:25.751Z",
//   "isCompleted": true,
//   "userId": 1,
//   "taskPriorityId": 3
// }












export class EditTaskComponent implements OnInit {


  selectedTime:string='10:30'

   taskId!:number ;
  userId!:number ;

  task:editTask=
  {
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    isCompleted: false,
    userId: this.userId,
    taskPriorityId:0
  }



toggleTask:TaskStructure=
{
  taskId: this.taskId,
  title: this.task.title,
  description: this.task.description,
  dueDate: new Date(this.task.dueDate),
  isCompleted:this.task.isCompleted,
  userId: this.userId,
  taskPriorityId: this.task.taskPriorityId,
}



  constructor(private route:ActivatedRoute,private taskService:TaskService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void 
  {
this.route.paramMap.subscribe(params=>
{

  const taskIdParam=params.get("taskId")
  const userIdParam=params.get("userId")

  if(taskIdParam!=null && userIdParam!=null)
  {
    this.taskId= +taskIdParam
    this.userId=+userIdParam
  }else
  {
    console.log("error : to edit task userid and taskid is null ")
  }


  console.log("Task id : "+this.taskId)
  console.log("User id : "+this.userId)
}





)

this.getTask()

  }

getTask()
{
  this.taskService.getTask(this.taskId,this.userId).subscribe((data)=>{ this.task=data;    this.task.dueDate = new Date(this.task.dueDate).toISOString().split('T')[0]; },(error)=>{console.log("Get task error : ",error.error)})

}
 
  editTask(task:editTask)
  {

    console.log("In Edit Task :: ",task)


    



    this.taskService.updateTask(task,this.taskId,this.userId).subscribe((data)=>{ console.log("edit task response : ",data);
         this.toaster.success("Task updated successfully!");  
       console.log("selected time is : ",this.selectedTime)
       this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI("/taskList")]);
    }); },(error)=>{console.log("edit task error : ",error.error)})






    // this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([decodeURI("")]);
    // });



   }

   toggleStatus(task:editTask)
   {

const status=task.isCompleted


this.toggleTask.taskId=this.taskId
this.toggleTask.title=task.title
this.toggleTask.description=task.description
this.toggleTask.dueDate=new Date(task.dueDate)
this.toggleTask.userId=this.userId
this.toggleTask.isCompleted=task.isCompleted
this.toggleTask.taskPriorityId=task.taskPriorityId

if(status) // true
{
this.taskService.ChangeCompleteTaskToIncomplete(this.toggleTask).subscribe((data)=>{console.log("toggleStatus response edit task [1 to 0] : ",data),this.getTask()},(error)=>{console.log("toggleStatus error edit task [1 to 0] : ",error)})
}else // false
{
  this.taskService.ChangeInCompleteTaskTocomplete(this.toggleTask).subscribe((data)=>{console.log("toggleStatus response edit task [0 to 1]: ",data),this.getTask()},(error)=>{console.log("toggleStatus error edit task [0 to 1]: ",error)})
}

   }







}
