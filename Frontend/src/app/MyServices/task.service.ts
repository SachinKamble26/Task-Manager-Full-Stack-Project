import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createTaskDTO } from '../MyComponents/add-task/add-task.component';
import { editTask } from '../MyComponents/edit-task/edit-task.component';
import { SetReminder } from '../MyComponents/set-reminder/set-reminder.component';




export interface TaskStructure
{
  taskId: number;
        title: string;
        description: string;
        dueDate: Date;
        isCompleted:boolean;
        userId: number;
        taskPriorityId: number;
  

}



@Injectable({
  providedIn: 'root'
})


export class TaskService 
{

  public filterListId:number=0

// private apiUrl:string="https://localhost:7127/TaskManagement/Task/getTaskListPerUser/1";


  constructor( private http:HttpClient ) 
  { 
   }


   getTaskListPerUser(userid:number | undefined):Observable<TaskStructure[]>
   {
         return this.http.get<TaskStructure[]>(`https://localhost:7127/TaskManagement/Task/getTaskListPerUser/${userid}`);
   }

// https://localhost:7127/TaskManagement/Task/ChangeCompleteTaskToIncomplete?taskId=5&userId=1


ChangeCompleteTaskToIncomplete(task:TaskStructure):Observable<any>
{
  return this.http.put(`https://localhost:7127/TaskManagement/Task/ChangeCompleteTaskToIncomplete?taskId=${task.taskId}&userId=${task.userId}`,{})
}


// https://localhost:7127/TaskManagement/Task/completeTask?taskId=5&userId=1


ChangeInCompleteTaskTocomplete(task:TaskStructure):Observable<any>
{
return  this.http.put(`https://localhost:7127/TaskManagement/Task/completeTask?taskId=${task.taskId}&userId=${task.userId}`,{})
}







// https://localhost:7127/TaskManagement/Task/changeTaskPriority?taskPriorityId=1&taskId=4&userId=1



ModifyTaskPriority(task:TaskStructure):Observable<string>
{

  return this.http.put<string>(`https://localhost:7127/TaskManagement/Task/changeTaskPriority?taskPriorityId=${task.taskPriorityId}&taskId=${task.taskId}&userId=${task.userId}`,{})

}



// https://localhost:7127/TaskManagement/Task/createTask

// https://localhost:7127/TaskManagement/Task/createTask/10%3A30

createTask(task:createTaskDTO):Observable<any>
{
return this.http.post(`https://localhost:7127/TaskManagement/Task/createTask`,task)
}



// https://localhost:7127/TaskManagement/Task/getTask?taskId=3&userId=1

getTask(taskId:number,userId:number):Observable<any>
{
return this.http.get(`https://localhost:7127/TaskManagement/Task/getTask?taskId=${taskId}&userId=${userId}`)
}



// https://localhost:7127/TaskManagement/Task/updateTask?taskId=5&userId=1

updateTask(task:editTask,taskId:number,userId:number):Observable<any>
{
return this.http.put(`https://localhost:7127/TaskManagement/Task/updateTask?taskId=${taskId}&userId=${userId}`,task)
}




// https://localhost:7127/TaskManagement/Task/deleteTask?taskId=6&userId=1

deleteTask(taskId:number,userId:number):Observable<any>
{
 return  this.http.delete(`https://localhost:7127/TaskManagement/Task/deleteTask?taskId=${taskId}&userId=${userId}`)
}


// https://localhost:7127/TaskManagement/Task/filterTaskByCompletionStatusOne?userId=1


filterCompleteTasks(userId:number | undefined) :Observable<TaskStructure[]>
{
  return this.http.get<TaskStructure[]>(`https://localhost:7127/TaskManagement/Task/filterTaskByCompletionStatusOne?userId=${userId}`)
}


// https://localhost:7127/TaskManagement/Task/filterTaskByCompletionStatusZero?userId=1

filterPendingTasks(userId:number | undefined):Observable<TaskStructure[]>
{
  return this.http.get<TaskStructure[]>(`https://localhost:7127/TaskManagement/Task/filterTaskByCompletionStatusZero?userId=${userId}`)
}



// https://localhost:7127/TaskManagement/Task/sortTaskByDueDate?userId=1


sortTaskByDueDate(userId:number | undefined):Observable<TaskStructure[]>
{
return this.http.get<TaskStructure[]>(`https://localhost:7127/TaskManagement/Task/sortTaskByDueDate?userId=${userId}`)
}

// https://localhost:7127/TaskManagement/Task/setReminder



setReminder(setReminderObj:SetReminder):Observable<any>
{
  return this.http.post("https://localhost:7127/TaskManagement/Task/setReminder",setReminderObj);
}





}
