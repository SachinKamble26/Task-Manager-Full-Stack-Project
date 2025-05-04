import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/MyServices/auth-service.service';
import { TaskService, TaskStructure } from 'src/app/MyServices/task.service';
import { UserService } from 'src/app/MyServices/user.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit 
{

tasksList:TaskStructure[]=[];
filteredTasksList:TaskStructure[]=[];  // for searchbar
userid:number | undefined =this.userService.getUseridFromLogInComponent();

searchQuery:string=''  // for searchbar

  constructor(private taskService:TaskService,private router:Router,private userService:UserService ,private authService:AuthServiceService,private toaster:ToastrService) { }

  ngOnInit(): void 
  {


    const id=this.authService.getUserId()


    if(id)
    {
      this.userid =parseInt(id);
    }


    this.userid = this.userService.getUseridFromLogInComponent();
       this.getTaskListPerUser()
  }

  // getTaskListPerUser():void
  // {

  //    this.userid= this.userService.getUseridFromLogInComponent()

  //   this.taskService.getTaskListPerUser( this.userid).subscribe((data)=>{  this.tasksList=data.map(task=>{task.dueDate=new Date(task.dueDate);return task;} )   },(error)=>{  console.error("get Error while Fecthing task per user",error.error)   })
  // }

  getTaskListPerUser(): void {
  // Retrieve userid
  this.userid = this.userService.getUseridFromLogInComponent();

  if (!this.userid) {
    console.error("User ID is undefined or not set!");
    return;
  }

  this.taskService.getTaskListPerUser(this.userid).subscribe(
    (data) => {
      this.tasksList = data.map((task) => {
        task.dueDate = new Date(task.dueDate);
        return task;
      });


      this.filteredTasksList=[...this.tasksList]

    },
    (error) => {
      console.error("Error while fetching tasks for user", error);
    }
  );
}


  
toggleStatus(task:TaskStructure)
{

  console.log(" in toggletstatus()")

const status=task.isCompleted ? 1:0;

console.log(task)
console.log("status = "+status)

if(status==1)
{
this.taskService.ChangeCompleteTaskToIncomplete(task).subscribe((data)=>{ console.log( "response of Change Complete Task To Incomplete :"+data) ;  this.getTaskListPerUser(); this.router.navigateByUrl("/taskList"); },(error)=>{"error of Change Complete Task To Incomplete : "+error})

}




  if(status==0)
  {
    this.taskService.ChangeInCompleteTaskTocomplete(task).subscribe((data)=>{console.log("response of Change InComplete Task To complete :"+data),  this.getTaskListPerUser(); this.router.navigateByUrl("/taskList"); },(error)=>{"error of Change InComplete Task To complete : "+error})

  
  }


}




changeTaskPriority(task:TaskStructure)
{
  if(task.taskPriorityId==1)  // 1 -- 2 // High to medium
  {

    task.taskPriorityId=2;
    this.taskService.ModifyTaskPriority(task).subscribe((data)=>{console.log("Task Priority Response : "+data),this.getTaskListPerUser(); this.router.navigateByUrl("/taskList"); },(error)=>{console.log("Task Priority Error : "+error)});


  }else if(task.taskPriorityId==2) // 2 -- 3 // Medium to Low
  {
    task.taskPriorityId=3;
    this.taskService.ModifyTaskPriority(task).subscribe((data)=>{console.log("Task Priority Response : "+data),this.getTaskListPerUser(); this.router.navigateByUrl("/taskList"); },(error)=>{console.log("Task Priority Error : "+error)});

  }else // task.taskPriorityId==3  // 3 -- 1  // Low to High
  {
    task.taskPriorityId=1;
    this.taskService.ModifyTaskPriority(task).subscribe((data)=>{console.log("Task Priority Response : "+data),this.getTaskListPerUser(); this.router.navigateByUrl("/taskList"); },(error)=>{console.log("Task Priority Error : "+error)});

  }
}



   // this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([decodeURI("")]);
    // });

deleteTask(taskId:number,userId:number)
{
  console.log("Task Deleted")
  this.taskService.deleteTask(taskId,userId).subscribe((data)=>{console.log("Delete Task Response : "+data);              this.getTaskListPerUser();    
    
    
    this.router.navigateByUrl("/taskList");
      this.toaster.success("Task deleted successfully")
  
    

 
  
  
  },(error)=>{console.log("Delete Task error : "+error);   this.toaster.warning("Task not deleted!")})
}






filterTasks()
{

  if(this.searchQuery.trim()==='')
  {
    this.filteredTasksList=[...this.tasksList]
  }else
  {
    this.filteredTasksList=this.tasksList
    .filter
    (
      task=>task.title.toLocaleLowerCase().includes(this.searchQuery.toLowerCase()) ||
      task.description.toLocaleLowerCase().includes(this.searchQuery.toLowerCase())
     
    )
  }


}









}
