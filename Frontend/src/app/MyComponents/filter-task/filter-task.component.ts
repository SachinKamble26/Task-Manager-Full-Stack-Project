import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/MyServices/auth-service.service';
import { TaskService, TaskStructure } from 'src/app/MyServices/task.service';
import { UserService } from 'src/app/MyServices/user.service';

@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.css']
})
export class FilterTaskComponent implements OnInit {


  selectedFilter:number=1;
  

  tasksList:TaskStructure[]=[];
  userid:number | undefined =this.userService.getUseridFromLogInComponent();
  
    constructor(private taskService:TaskService,private router:Router,private userService:UserService,private authService:AuthServiceService,private toaster:ToastrService ) { }
  
    ngOnInit(): void 
    {

      this.userService.filterListId=this.selectedFilter
      this.taskService.filterListId=this.selectedFilter
      


      this.userid = this.userService.getUseridFromLogInComponent();


     const id= this.authService.getUserId()
     if(id)
     {
      this.userid=parseInt(id)
     }



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


    
    const id= this.authService.getUserId()
    if(id)
    {
     this.userid=parseInt(id)
    }

  
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
  this.taskService.ChangeCompleteTaskToIncomplete(task).subscribe( async (data)=>{ console.log( "response of Change Complete Task To Incomplete :"+data) ;  
    
    if(this.selectedFilter==1)
      {
        this.getTaskListPerUser(); 
      }
      else if(this.selectedFilter==2)
      {

        await this.delay(120);

    this.getCompleteTasks()
      }
      else if(this.selectedFilter==3)
        {

          await this.delay(120)

      this.getPendingTasks()
        }
        else if(this.selectedFilter==4)
          {
        

            this.sortTaskByDueDate()

          }
          else if(this.selectedFilter==5)
            {
          this.getHighPriorityTask()
            }
            else if(this.selectedFilter==6)
              {
            this.getMediumPriorityTask()
              }
              else // low // 7
                {
              this.getLowPriorityTask()
                }
  },(error)=>{"error of Change Complete Task To Incomplete : "+error})
  
  }
  
  
    if(status==0)
    {
      this.taskService.ChangeInCompleteTaskTocomplete(task).subscribe( async (data)=>{console.log("response of Change InComplete Task To complete :"+data);
  
      
      
        if(this.selectedFilter==1)
          {
            this.getTaskListPerUser(); 
          }
          else if(this.selectedFilter==2)
          {
    
            await this.delay(120);
    
        this.getCompleteTasks()
          }
          else if(this.selectedFilter==3)
            {
    
              await this.delay(120)
    
          this.getPendingTasks()
            }
            else if(this.selectedFilter==4)
              {
            this.sortTaskByDueDate()
              }
              else if(this.selectedFilter==5)
                {
              this.getHighPriorityTask()
                }
                else if(this.selectedFilter==6)
                  {
                this.getMediumPriorityTask()
                  }
                  else // low // 7
                    {
                  this.getLowPriorityTask()
                    }

      
      },(error)=>{"error of Change InComplete Task To complete : "+error})
  
    
    }
   
      
  
  }
  
  
  
  
  changeTaskPriority(task:TaskStructure)
  {
    if(task.taskPriorityId==1)  // 1 -- 2 // High to medium
    {
  
      task.taskPriorityId=2;
      this.taskService.ModifyTaskPriority(task).subscribe((data)=>{console.log("Task Priority Response : "+data);





        if(this.selectedFilter==1)
          {
            this.getTaskListPerUser(); 
          }
          else if(this.selectedFilter==2)
          {
        this.getCompleteTasks()
          }
          else if(this.selectedFilter==3)
            {
          this.getPendingTasks()
            }
            else if(this.selectedFilter==4)
              {
            
              }
              else if(this.selectedFilter==5)
                {
              
                }
                else if(this.selectedFilter==6)
                  {
                
                  }
                  else // low // 7
                    {
                  
                    }
          






       },(error)=>{console.log("Task Priority Error : "+error)});
  
  
    }else if(task.taskPriorityId==2) // 2 -- 3 // Medium to Low
    {
      task.taskPriorityId=3;
      this.taskService.ModifyTaskPriority(task).subscribe((data)=>{console.log("Task Priority Response : "+data);



        if(this.selectedFilter==1)
          {
            this.getTaskListPerUser(); 
          }
          else if(this.selectedFilter==2)
          {
        this.getCompleteTasks()
          }
          else if(this.selectedFilter==3)
            {
          this.getPendingTasks()
            }
            else if(this.selectedFilter==4)
              {
            
              }
              else if(this.selectedFilter==5)
                {
              
                }
                else if(this.selectedFilter==6)
                  {
                
                  }
                  else // low // 7
                    {
                  
                    }
          




        },(error)=>{console.log("Task Priority Error : "+error)});
  
    }else // task.taskPriorityId==3  // 3 -- 1  // Low to High
    {
      task.taskPriorityId=1;
      this.taskService.ModifyTaskPriority(task).subscribe((data)=>{console.log("Task Priority Response : "+data);
        
        
        
        
        if(this.selectedFilter==1)
          {
            this.getTaskListPerUser(); 
          }
          else if(this.selectedFilter==2)
          {
        this.getCompleteTasks()
          }
          else if(this.selectedFilter==3)
            {
          this.getPendingTasks()
            }
            else if(this.selectedFilter==4)
              {
            
              }
              else if(this.selectedFilter==5)
                {
              
                }
                else if(this.selectedFilter==6)
                  {
                
                  }
                  else // low // 7
                    {
                  
                    }
          
        
        
        
          },(error)=>{console.log("Task Priority Error : "+error)});
  
    }
  }
  
  
  
     // this.router.navigateByUrl('/about', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([decodeURI("")]);
      // });
  
  deleteTask(taskId:number,userId:number)
  {
    console.log("Task Deleted")
    this.taskService.deleteTask(taskId,userId).subscribe((data)=>{console.log("Delete Task Response : "+data);this.getTaskListPerUser();     
     
     

      if(this.selectedFilter==1)
        {
          this.getTaskListPerUser(); 
            this.toaster.success("Task deleted succesfully!")
          // this.router.navigateByUrl("/filterList");  
        }
        else if(this.selectedFilter==2)
        {
      this.getCompleteTasks()
        this.toaster.success("Task deleted succesfully!")

        }
        else if(this.selectedFilter==3)
          {
        this.getPendingTasks()
          this.toaster.success("Task deleted succesfully!")
          }
          else if(this.selectedFilter==4)
            {
          this.sortTaskByDueDate()
            this.toaster.success("Task deleted succesfully!")
            }
            else if(this.selectedFilter==5)
              {
            this.getHighPriorityTask()
              this.toaster.success("Task deleted succesfully!")
              }
              else if(this.selectedFilter==6)
                {
            this.getMediumPriorityTask()
              this.toaster.success("Task deleted succesfully!")
                }
                else // low // 7
                  {
                    this.getLowPriorityTask()
                      this.toaster.success("Task deleted succesfully!")
                  }


         
    
    
    
    },(error)=>{console.log("Delete Task error : "+error);   this.toaster.warning("Task not deleted!")})
  }
  
  

  getCompleteTasks()
  {
    this.taskService.filterCompleteTasks(this.userService.userid ).subscribe((data)=>{console.log("get completet tasks data : ,",data);         this.tasksList = data.map((task) => {
      task.dueDate = new Date(task.dueDate);
      return task;
    });       
  

  
  
  
  },(error)=>{console.log("get complete tasks error : ",error.error)})
  }


  getPendingTasks()
  {
    this.taskService.filterPendingTasks(this.userService.userid ).subscribe((data)=>{console.log("get pending tasks data : ,",data);         this.tasksList = data.map((task) => {
      task.dueDate = new Date(task.dueDate);
      return task;
    });
  


  
  },(error)=>{console.log("get pending tasks error : ",error.error)})
  
  }
  



getHighPriorityTask()
{
  this.taskService.getTaskListPerUser(this.userid).subscribe(
    (data) => {
      this.tasksList = data .filter(task => task.taskPriorityId === 1).map((task) => {
        task.dueDate = new Date(task.dueDate);
        return task;
      });
    },
    (error) => {
      console.error("Error while fetching tasks for user", error);
    }
  );
}



getMediumPriorityTask()
{
  this.taskService.getTaskListPerUser(this.userid).subscribe(
    (data) => {
      this.tasksList = data .filter(task => task.taskPriorityId === 2).map((task) => {
        task.dueDate = new Date(task.dueDate);
        return task;
      });
    },
    (error) => {
      console.error("Error while fetching tasks for user", error);
    }
  );
}





getLowPriorityTask()
{
  this.taskService.getTaskListPerUser(this.userid).subscribe(
    (data) => {
      this.tasksList = data .filter(task => task.taskPriorityId === 3).map((task) => {
        task.dueDate = new Date(task.dueDate);
        return task;
      });
    },
    (error) => {
      console.error("Error while fetching tasks for user", error);
    }
  );
}

  
  
  
  handleFilterChange(value:number)
  {

    this.selectedFilter=value
    this.userService.filterListId=value
    this.taskService.filterListId=value
    
    console.log(" in handleFilterChange value : ",value)

if(value==1)
{
  this.getTaskListPerUser()         
}
else if(value==2)
{
  this.getCompleteTasks()
}
else if(value==3)
  {
    this.getPendingTasks()
  }
    else if(value==4)
      {
        this.sortTaskByDueDate()
      }
      else if(value==5)
        {
          


this.getHighPriorityTask()

        }
        else if(value==6)
          {
            this.getMediumPriorityTask()
          }
          else if(value==7)
            {
              this.getLowPriorityTask()
            }else
            {

            }


  }





  sortTaskByDueDate()
  {
    this.taskService.sortTaskByDueDate(this.userService.userid)

.subscribe((data)=>{console.log("sort task by due date data : ,",data);         this.tasksList = data.map((task) => {
      task.dueDate = new Date(task.dueDate);
      return task;
    });
  

  },(error)=>{console.log("sort tasks by due date error : ",error.error)})
  
  }
  
  
  





















  





  











  
  getFilterColor(value:number)
  {

    this.selectedFilter=value
    this.userService.filterListId=value
    this.taskService.filterListId=value

    console.log(" in getFilterColor value : ",value)

    switch(value)
    {
      case 1: return 'txt-secondary';
      case 2: return 'txt-success';
      case 3: return 'txt-danger';
      case 4: return 'txt-info';
      case 5: return 'txt-danger';
      case 6: return 'txt-warning';
      case 7: return 'txt-primary';
      default:return 'txt-secondary'
    }
  }
  
  
  
  
  getEmptyMessage(filter: number): string {

    this.selectedFilter=filter
    this.userService.filterListId=filter
    this.taskService.filterListId=filter

    switch (filter) {
      case 1: return 'There are no tasks for you.';
      case 2: return 'There are no completed tasks.';
      case 3: return 'There are no pending tasks.';
      case 4: return 'There are no tasks to sort by due date.';
      case 5: return 'There are no high priority tasks.';
      case 6: return 'There are no medium priority tasks.';
      case 7: return 'There are no low priority tasks.';
      default: return 'No tasks found.';
    }
  }
  
  
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  

}
