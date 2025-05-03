

using Microsoft.Data.SqlClient;
using TaskManagementWebApp.Models;

namespace TaskManagementWebApp.Dao
{
    public class TaskDaoImpl : TaskDao
    {

        private string connectionString = "Data Source=localhost\\sqlexpress01;Initial Catalog=TaskManagement;Integrated Security=True;Encrypt=False";

   

        public string createTask(Models.Task task)
        {
            try
            {

                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "insert into task (title,description,duedate,iscompleted,userid,taskpriorityid) values (@Title,@Description,@DueDate,@IsCompleted,@UserId,@TaskPriorityId) ";


                    using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                    {
                        sqlCommand.Parameters.AddWithValue("@Title", task.Title);

                        sqlCommand.Parameters.AddWithValue("@Description", task.Description);


                        //if(task.DueDate >=DateTime.Now) // validation
                        //{
                        //    sqlCommand.Parameters.AddWithValue("@DueDate", task.DueDate);
                        //}else
                        //{
                        //    return "Due date cannot be lower than current date ! .Due date should be current date or greater than current date. ";
                        //}


                        sqlCommand.Parameters.AddWithValue("@DueDate", task.DueDate);
                        sqlCommand.Parameters.AddWithValue("@IsCompleted", task.IsCompleted);

                        sqlCommand.Parameters.AddWithValue("@UserId", task.UserId);

                        sqlCommand.Parameters.AddWithValue("@TaskPriorityId", task.TaskPriorityId);

                        int rowAffected = sqlCommand.ExecuteNonQuery();
                        return rowAffected > 0 ? "Task created successfully" : "Task creation failed";

                    }
                }

            }catch (Exception ex)

            {
                return "An error got while creating task : "+ex.Message ;
            }



          

          

          
        }

  
        public string deleteTask(int taskId, int userId)
        {
           
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "delete from task where id= @TaskId and userid= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@TaskId", taskId);
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        int rowAffected=cmd.ExecuteNonQuery();

                        return rowAffected > 0 ? "Task deleted successfully" : "Task does not exist to delete !";
                    }
                }
            }
            catch (Exception ex)
            {
                return "An error occured while deleting task : " + ex.Message;
            }




           
        }


        public string changeTaskPriority(int taskPriorityId, int taskId, int userId)
        {
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "update task set taskpriorityid= @TaskPriorityId where id= @TaskId and userid= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@TaskPriorityId", taskPriorityId);
                        cmd.Parameters.AddWithValue("@TaskId", taskId);
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        int rowAffected=cmd.ExecuteNonQuery();
                        return rowAffected > 0 ? "Task Priority Changed succesfully" : "Task Priority Changes Failed !!";
                    }
                }
            }
            catch (Exception ex)
            {
                return "An error occured while changing task priority : " + ex.Message;
            }
           
        }

        public string completeTask(int taskId, int userId)
        {
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "update task set iscompleted= @IsCompleted where id= @TaskId and userid= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@IsCompleted",1);
                        cmd.Parameters.AddWithValue("@TaskId", taskId);
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        int rowAffected = cmd.ExecuteNonQuery();
                        return rowAffected > 0 ? "Task Changed From Status InCompleted to Completed succesfully" : "Task Completion Changes Failed !!";

                    }
                }
            }
            catch (Exception ex)
            {
                return "An error occured while changing task completion status :" + ex.Message;
            }
           
        }


        public List<Models.Task> filterTaskByCompletionStatusOne(int userId)
        {

            List<Models.Task> taskslist = new List<Models.Task>();

            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from task where userid= @UserId and iscompleted = @IsCompleted";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@IsCompleted",1);
                        SqlDataReader sqlDataReader =cmd.ExecuteReader();
                    
                        while (sqlDataReader.Read())
                        {



                            int id = Convert.ToInt32(sqlDataReader["Id"]);
                            string title = Convert.ToString(sqlDataReader["Title"]);
                            string description = Convert.ToString(sqlDataReader["Description"]);
                            DateOnly duedate = DateOnly.FromDateTime(Convert.ToDateTime(sqlDataReader["Duedate"]));
                            bool isCompleted = Convert.ToBoolean(sqlDataReader["IsCompleted"]);
                            int userIdFromDatabase = Convert.ToInt32(sqlDataReader["UserId"]);
                            int taskPriorityId = Convert.ToInt32(sqlDataReader["TaskPriorityId"]);


                           Models.Task task = new Models.Task(id,title,description,duedate,isCompleted,userIdFromDatabase,taskPriorityId);

                            taskslist.Add(task);

                        }

                       

                    }
                }
            }
            catch (Exception ex)
            {
                 Console.WriteLine("An error occured while filtering Task By Completion Status One  : " + ex.Message);
            }

            return taskslist;

        }

        public List<Models.Task> getTaskListOfAllUsers()
        {


            List<Models.Task> taskslist = new List<Models.Task>(); 
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from task";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        SqlDataReader sqlDataReader = cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {

                            Models.Task task = new Models.Task(Convert.ToInt32(sqlDataReader["Id"]), Convert.ToString(sqlDataReader["Title"]), Convert.ToString(sqlDataReader["Description"]),DateOnly.FromDateTime(   Convert.ToDateTime(sqlDataReader["Duedate"])), Convert.ToBoolean(sqlDataReader["IsCompleted"]), Convert.ToInt32(sqlDataReader["UserId"]), Convert.ToInt32(sqlDataReader["TaskPriorityId"]));

                            taskslist.Add(task);

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while getting Task List Of AllUsers  : " + ex.Message);
            }
            //return "task list of All Users";

            return taskslist;
        }


        public List<Models.Task> getTaskListPerUser(int userId)
        {


            List<Models.Task> taskslist = new List<Models.Task>();

            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from task where userid= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                      
                        SqlDataReader sqlDataReader = cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {

                            Models.Task task = new Models.Task(Convert.ToInt32(sqlDataReader["Id"]), Convert.ToString(sqlDataReader["Title"]), Convert.ToString(sqlDataReader["Description"]),DateOnly.FromDateTime(    Convert.ToDateTime(sqlDataReader["Duedate"])), Convert.ToBoolean(sqlDataReader["IsCompleted"]), Convert.ToInt32(sqlDataReader["UserId"]), Convert.ToInt32(sqlDataReader["TaskPriorityId"]));

                            taskslist.Add(task);

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while getting Task List Of Per User  : " + ex.Message);
            }
            return taskslist;
        }

        public List<Models.Task> sortTaskByDueDate(int userId)
        {
            List<Models.Task> taskslist = new List<Models.Task>();
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from task where userid= @UserId order by duedate";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                       
                        cmd.Parameters.AddWithValue("@UserId", userId);
                       
                        SqlDataReader sqlDataReader = cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {

                            Models.Task task = new Models.Task(Convert.ToInt32(sqlDataReader["Id"]), Convert.ToString(sqlDataReader["Title"]), Convert.ToString(sqlDataReader["Description"]),DateOnly.FromDateTime(  Convert.ToDateTime(sqlDataReader["Duedate"])), Convert.ToBoolean(sqlDataReader["IsCompleted"]), Convert.ToInt32(sqlDataReader["UserId"]), Convert.ToInt32(sqlDataReader["TaskPriorityId"]));

                            taskslist.Add(task);

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while Sorting Task By Due Date  : " + ex.Message);
            }
            return taskslist;
        }

        public string updateTask(int taskId, int userId,Models.Task task)
        {
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "update task set title= @Title,description= @Description,duedate= @Duedate,iscompleted= @IsCompleted,taskpriorityid= @TaskPriorityId where id= @TaskId and userid= @UserId";
                    using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                    {
                        sqlCommand.Parameters.AddWithValue("@TaskId", taskId);  

                        sqlCommand.Parameters.AddWithValue("@Title", task.Title);

                        sqlCommand.Parameters.AddWithValue("@Description", task.Description);

                        sqlCommand.Parameters.AddWithValue("@DueDate", task.DueDate);

                        sqlCommand.Parameters.AddWithValue("@IsCompleted", task.IsCompleted);

                        sqlCommand.Parameters.AddWithValue("@UserId", userId); 

                        sqlCommand.Parameters.AddWithValue("@TaskPriorityId", task.TaskPriorityId); 

                        int rowAffected = sqlCommand.ExecuteNonQuery();
                        return rowAffected > 0 ? "Task updated successfully" : "Task updation failed";
                    }
                }
            }
            catch (Exception ex)
            {
                return "An error occured while updating task : " + ex.Message;
            }
            //return "task updated";
        }

        public List<Models.Task> filterTaskByCompletionStatusZero(int userId)
        {
            List<Models.Task> taskslist = new List<Models.Task>();

            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from task where userid= @UserId and iscompleted = @IsCompleted";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@IsCompleted", 0);
                        SqlDataReader sqlDataReader = cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {



                            int id = Convert.ToInt32(sqlDataReader["Id"]);
                            string title = Convert.ToString(sqlDataReader["Title"]);
                            string description = Convert.ToString(sqlDataReader["Description"]);
                            DateOnly duedate = DateOnly.FromDateTime(Convert.ToDateTime(sqlDataReader["Duedate"]));
                            bool isCompleted = Convert.ToBoolean(sqlDataReader["IsCompleted"]);
                            int userIdFromDatabase = Convert.ToInt32(sqlDataReader["UserId"]);
                            int taskPriorityId = Convert.ToInt32(sqlDataReader["TaskPriorityId"]);


                            Models.Task task = new Models.Task(id, title, description, duedate, isCompleted, userIdFromDatabase, taskPriorityId);

                            taskslist.Add(task);

                        }



                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while filtering Task By Completion Status One  : " + ex.Message);
            }

            return taskslist;
        }

        public string ChangeCompleteTaskToIncomplete(int taskId, int userId)
        {
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "update task set iscompleted= @IsCompleted where id= @TaskId and userid= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@IsCompleted", 0);
                        cmd.Parameters.AddWithValue("@TaskId", taskId);
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        int rowAffected = cmd.ExecuteNonQuery();
                        return rowAffected > 0 ? "Task Changed From Status Completed to InCompleted succesfully" : "Task Completion Changes Failed !!";

                    }
                }
            }
            catch (Exception ex)
            {
                return "An error occured while changing task completion status :" + ex.Message;
            }
        }

        public string deleteAllTask(int userId)
        {
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "delete from task where userid= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        int rowAffected = cmd.ExecuteNonQuery();

                        return rowAffected > 0 ? "All Tasks deleted successfully of userId : "+userId : "User with userid : "+userId+" does not have any tasks to delete";
                    }
                }
            }
            catch (Exception ex)
            {
                return "An error occured while deleting All tasks of user : " + ex.Message;
            }

        }

        public Models.Task getTask(int taskId, int userId)
        {
            

 Models.Task task = null;

            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from task where userid= @UserId and id = @TaskId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@TaskId", taskId);
                        SqlDataReader sqlDataReader = cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {



                            int id = Convert.ToInt32(sqlDataReader["Id"]);
                            string title = Convert.ToString(sqlDataReader["Title"]);
                            string description = Convert.ToString(sqlDataReader["Description"]);
                            DateOnly duedate = DateOnly.FromDateTime(Convert.ToDateTime(sqlDataReader["Duedate"]));
                            bool isCompleted = Convert.ToBoolean(sqlDataReader["IsCompleted"]);
                            int userIdFromDatabase = Convert.ToInt32(sqlDataReader["UserId"]);
                            int taskPriorityId = Convert.ToInt32(sqlDataReader["TaskPriorityId"]);


                             task = new Models.Task(id, title, description, duedate, isCompleted, userIdFromDatabase, taskPriorityId);

                            

                        }

                        Console.WriteLine(task.ToString());



                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while retrieving individual single task  : " + ex.Message);
            }


            return task;
        }
    }
}
