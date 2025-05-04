import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/MyServices/task.service';



/**
 

{
  "reminderDate": "2025-04-17",
  "reminderTime": "16:16",
  "userId": 27,
  "taskId": 62
}


 */


export interface SetReminder
{
  reminderDate: string,
  reminderTime: string,
  userId: number,
  taskId: number
}




@Component({
  selector: 'app-set-reminder',
  templateUrl: './set-reminder.component.html',
  styleUrls: ['./set-reminder.component.css']
})
export class SetReminderComponent implements OnInit {


setReminderObj:SetReminder=
  {
    reminderDate: new Date().toISOString().split("T")[0],
    reminderTime: "10:30",
    userId: 0,
    taskId: 0
  }

title:string=''




  constructor(private route:ActivatedRoute,private router:Router,private taskService:TaskService,private toaster:ToastrService) { }

  ngOnInit(): void 
  {

    this.route.paramMap.subscribe(params=>
      {

        const taskId=params.get("taskId")
        const userId=params.get("userId")
        const title=params.get("title")

        if(taskId!=null && userId!=null && title!=null)
        {

          this.setReminderObj.taskId=+taskId
          
      this.setReminderObj.userId=+userId
      
      this.title=title
        }

      
      }
    
    
    )






  }


  setReminder()
  {

    console.log("set reminder object : ",this.setReminderObj);
//   this.toaster.warning("Reminder set successfully. User will get reminder on registered email id!")
// this.router.navigateByUrl("/taskList")
     this.taskService.setReminder(this.setReminderObj).subscribe((data)=>{console.log("set reminder response : ",data);

        this.toaster.success("Reminder set successfully. User will get reminder on registered email id!");
this.router.navigateByUrl("/taskList");

     },(error)=>{console.log("set reminder error : ",error.error)});
  }

}
