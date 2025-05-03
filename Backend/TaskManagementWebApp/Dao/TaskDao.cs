using TaskManagementWebApp.Models;
using Task = TaskManagementWebApp.Models.Task;

namespace TaskManagementWebApp.Dao
{
    public interface TaskDao
    {

        // sort by due date, filter by completion status).
        public string createTask(Models.Task task); // create

        public List<Models.Task> getTaskListOfAllUsers(); // read
        public List<Models.Task> getTaskListPerUser(int userId); // read

        public List<Models.Task> sortTaskByDueDate(int userId); // read

        public List<Models.Task> filterTaskByCompletionStatusOne(int userId); // read

        public List<Models.Task> filterTaskByCompletionStatusZero(int userId); // read
        public string updateTask(int taskId,int userId, Models.Task task);  //update

        public string deleteTask(int taskId,int userId);  //

        public string deleteAllTask( int userId);  //

        public string ChangeCompleteTaskToIncomplete(int taskId, int userId);


        public string completeTask(int taskId, int userId);

        public string changeTaskPriority(int taskPriorityId, int taskId, int userId);


        public Task getTask(int taskId,int userId);
        


    }
}
