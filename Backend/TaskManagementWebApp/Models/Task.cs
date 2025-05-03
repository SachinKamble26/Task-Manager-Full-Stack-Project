using System.Data.Common;
using System.Runtime.Intrinsics.X86;
using System.Text.Json.Serialization;

namespace TaskManagementWebApp.Models
{
    public class Task
    {

        #region Notes to avoid errors
        // .net asp core -> pascal casing is used as camel casing in angular -- to bind data from frontendd to backend
        // that s why we send data in camel casing from frontend and it is binded to pascal  casing fields of dotnet models
        // every models should always have one patameterless constructor -- to run apis 

        #endregion


        #region Changes To Be Done
        // Changes to be done :: Change dueDate Datatype to 'DateOnly' in dotnet models and to 'DATE' in Mssql  
        #endregion

        // 'Id', 'Title', 'Description', 'DueDate', 'IsCompleted' ,'UserId', 'TaskPriorityId'

        //  sqlDataReader["Id"], sqlDataReader["Title"],sqlDataReader["Description"],sqlDataReader["Duedate"],sqlDataReader["IsCompleted"],sqlDataReader["UserId"],sqlDataReader["TaskPriorityId"],


        public Task( int Id,string Title,string Description,DateOnly Duedate,bool IsCompleted, int UserId ,int  TaskPriorityId)
        {
            this.Id = Id;
            this.Title = Title;
            this.Description = Description;
            this.DueDate = Duedate;
            this.IsCompleted = IsCompleted;
            this.UserId = UserId;
            this.TaskPriorityId = TaskPriorityId;   
            
        }


        public Task()
        {
            this.DueDate = new DateOnly();
            //this.user = new User();
        }

        [JsonIgnore]  // to serialise while adding to  database to create json object
        //[JsonPropertyName("Id")]
        public long Id { get; set; }


        [JsonPropertyName("taskId")]  // to serialise while fetching from database to create json object
        public long TaskId
        {
            get
            {
                return this.Id;
            }
        }

        public string Title { get; set; }
        public string Description { get; set; }

       
        public DateOnly DueDate { get; set; }

        public bool IsCompleted { get; set; }

        public int UserId { get; set; }
        public int TaskPriorityId { get; set; }




        // TaskActiveStaus Extra Column Not in use Currently
        //     public bool TaskActiveStatus { get; set; }  // -- to perform soft delete -- default status 1 -- after soft delete 0

        // if task is not completed and it deleted then only soft delete performed so it can be restored.
        // if task is completed and then it deleted then task will be permanently deleted

        //[JsonIgnore]
        //public User user { get; set; } 



        public string toString()
        {
            return "Task : "+"[ id : "+this.Id + " ,Title : " + this.Title + " ,Description : " + this.Description + " ,Duedate : " + this.DueDate + " ,IsCompleted : " + this.IsCompleted + " ,TaskPriorityId : " + this.TaskPriorityId + " ,UserId : " + this.UserId+" ]";
        }



    }
}
