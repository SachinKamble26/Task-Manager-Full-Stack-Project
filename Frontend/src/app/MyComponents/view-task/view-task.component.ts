import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/MyServices/task.service';



export interface viewTask 
{
  taskId: number;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  userId: number;
  taskPriorityId: number;
}


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

   taskId!:number ;
  userId!:number ;

  task:viewTask=
  {
    taskId: this.taskId,
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    isCompleted: false,
    userId: this.userId,
    taskPriorityId: 0
  }

  constructor(private route:ActivatedRoute,private taskService:TaskService,private router:Router) { }

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
    console.log("error : to view task userid and taskid is null ")
  }


  console.log("Task id : "+this.taskId)
  console.log("User id : "+this.userId)
})


this.getTask()



}

//---------------------------------------



getTask()
{
  this.taskService.getTask(this.taskId,this.userId).subscribe((data)=>{console.log("Get Task Response : ",data);this.task=data},(error)=>{console.log("Get Task error : ",error)})
}







}