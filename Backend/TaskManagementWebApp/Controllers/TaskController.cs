using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.VisualBasic;
using TaskManagementWebApp.Dao;
using TaskManagementWebApp.DTO;
using TaskManagementWebApp.Service;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TaskManagementWebApp.Controllers
{
    [ApiController]
    [Route("TaskManagement/[controller]")]
    public class TaskController : Controller
    {


        private TaskDaoImpl taskDao = new TaskDaoImpl();
        private UserDao userDao = new UserDaoImpl();    

        //[Authorize]
        [HttpPost("createTask")]
        public IActionResult createTask([FromBody] Models.Task task)
        {
            //Console.WriteLine("selected time : "+selectedTime);

            DateOnly currentDate=DateOnly.FromDateTime(DateTime.Now);
            Console.WriteLine("Current DatetTime : "+ currentDate);
            Console.WriteLine("DatetTime From Frontend: " + task.DueDate);



            

            if (task.DueDate >= currentDate) // validation
            {

                //--------------------------------------------------------

              string result= taskDao.createTask(task);



                //Models.User user = userDao.getUserUsingUserId(task.UserId);

                //TimeOnly duetime = TimeOnly.Parse("10:30"); // 11:30 am

                //DateTime duedateTime = task.DueDate.ToDateTime(duetime);

                //// ** Hangfire setup to send email to task user 

                //var reminderService = new ReminderService();

                //BackgroundJob.Schedule(
                //    () => reminderService.SendReminderEmail(
                //        user.Email,
                //        task.Title,
                //        duedateTime),
                //    duedateTime - DateTime.Now
                //);

                //--------------------------------------------------------

                //return Json("task created");
                return Json(result);

            }
            else
            {
                Console.WriteLine(task.toString());

                return BadRequest("Due date cannot be lower than current date !! . Due date should be current date or greater than current date.");

            }

            //------------------------------------------------------------------------------------------


           //Models.User user=userDao.getUserUsingUserId(task.UserId);

           // TimeOnly duetime = TimeOnly.Parse("11:30"); // 11:30 am

           // DateTime duedateTime = task.DueDate.ToDateTime(duetime);

           // // ** Hangfire setup to send email to task user 

           // var reminderService = new ReminderService();

           // BackgroundJob.Schedule(
           //     () => reminderService.SendReminderEmail(
           //         user.Email,
           //         task.Title,
           //         duedateTime),
           //     duedateTime - DateTime.Now
           // );
          

            // return Ok("Task created and reminder scheduled.");




            //---------------------------------------------------------------------------------------------




        }





        [HttpPost("setReminder")]
        public IActionResult setReminder([FromBody] SetReminderRequestDTO  setReminderRequestDTO)
        {


            Console.WriteLine("set reminder object : "+setReminderRequestDTO.toString());

            // title,description,reminder date,reminder time,userid

            Models.User user = userDao.getUserUsingUserId(setReminderRequestDTO.UserId);
            Models.Task task = taskDao.getTask(setReminderRequestDTO.TaskId, setReminderRequestDTO.UserId);



            Console.WriteLine(task.toString());
            Console.WriteLine(user.toString());


            TimeOnly duetime = TimeOnly.Parse(setReminderRequestDTO.ReminderTime); // 11:30 am

            DateTime duedateTime = setReminderRequestDTO.ReminderDate.ToDateTime(duetime);

            // ** Hangfire setup to send email to task user 

            ReminderService reminderService = new ReminderService();

            BackgroundJob.Schedule(
                () => reminderService.SendReminderEmail(
                    user.Email,
                    task.Title,
                    duedateTime,
                    user.Name),
                duedateTime - DateTime.Now
            );



            return Json("Remainder set succesfully");
        }
























        /*
       //-------------------------------------------------------------

       1.  Path Variable: DELETE /deleteTask/{taskId}

        [HttpDelete("deleteTask/{taskId}")]
        public IActionResult DeleteTask(int taskId) {}

       //-------------------------------------------------------------

       2. Query Parameter: DELETE /deleteTask?taskId=123

        [HttpDelete("deleteTask")]
        public IActionResult DeleteTask([FromQuery] int taskId) {}

        //-------------------------------------------------------------

       3. Request Body: DELETE /deleteTask with body { "taskId": 123 }

        [HttpDelete("deleteTask")]
        public IActionResult DeleteTask([FromBody] TaskRequest request) {}

       //-------------------------------------------------------------

       4. Header: DELETE /deleteTask with header X-Task-Id: 123

        [HttpDelete("deleteTask")]
        public IActionResult DeleteTask([FromHeader] int taskId) {}

       //-------------------------------------------------------------
       */


        [Authorize]
        [HttpDelete("deleteTask")]
        public IActionResult deleteTask([FromQuery] int taskId,[FromQuery] int userId)  // by default this parameters came from query string 
        { // like this : deleteTask?taskId=1&userId=3 -- > Query String

            //return Json("task deleted");
            return Json(taskDao.deleteTask(taskId,userId));
        }


        [Authorize]
        [HttpGet("getTaskListOfAllUsers")]
        public IActionResult getTaskListOfAllUsers()
        {

            //return Json("task list of All Users");
            return Json(taskDao.getTaskListOfAllUsers());
        }


        [Authorize]
        [HttpGet("getTaskListPerUser/{userId}")]  // here userId is an path variable 
        public IActionResult getTaskListPerUser(int userId)
        {

            //return Json("task list per User");
            return Json(taskDao.getTaskListPerUser(userId));
        }






        [Authorize]
        [HttpGet("filterTaskByCompletionStatusOne")]
        public IActionResult filterTaskByCompletionStatusOne([FromQuery] int userId)
        {

            
            return Json(taskDao.filterTaskByCompletionStatusOne(userId));
        }





        [Authorize]
        [HttpGet("filterTaskByCompletionStatusZero")]
        public IActionResult filterTaskByCompletionStatusZero([FromQuery] int userId)
        {
            return Json(taskDao.filterTaskByCompletionStatusZero(userId));
        }




        [Authorize]
        [HttpGet("sortTaskByDueDate")]
        public IActionResult sortTaskByDueDate([FromQuery] int userId)
        {

            //return Json("sortTaskByDueDate");
            return Json(taskDao.sortTaskByDueDate(userId));
        }





        [Authorize]
        [HttpGet("getTask")]
        public IActionResult getTask([FromQuery] int taskId, [FromQuery] int userId)
        {
            return Json(taskDao.getTask(taskId, userId));
        }





        [Authorize]
        [HttpPut("updateTask")]
        public IActionResult updateTask([FromQuery] int taskId,[FromQuery] int userId,[FromBody] Models.Task task)
        {

            //return Json("task updated");
            return Json(taskDao.updateTask(taskId,userId,task));
        }


        [Authorize]
        [HttpPut("changeTaskPriority")]
        public IActionResult changeTaskPriority([FromQuery] int taskPriorityId, [FromQuery] int taskId, [FromQuery] int userId)
        {
            //return Json("task priority changed");
            return Json(taskDao.changeTaskPriority(taskPriorityId,taskId,userId));
        }


        [Authorize]
        [HttpPut("completeTask")]
        public IActionResult completeTask([FromQuery] int taskId, [FromQuery] int userId)
        {
            //return Json("task completed");
            return Json(taskDao.completeTask(taskId,userId));
        }



        [Authorize]
        [HttpPut("ChangeCompleteTaskToIncomplete")]
        public IActionResult ChangeCompleteTaskToIncomplete([FromQuery] int taskId, [FromQuery]  int userId)
        {
            return Json(taskDao.ChangeCompleteTaskToIncomplete(taskId, userId));
        }


   

    }
}
