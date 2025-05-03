namespace TaskManagementWebApp.DTO
{
    public class SetReminderRequestDTO
    {
        //reminderDate,reminderTime,userId,taskId


       
        public DateOnly ReminderDate { get; set; }
        public string ReminderTime { get; set; }
        public int UserId { get; set; }

        public int TaskId { get; set; }



        public string toString()
        {
            return "SetReminderDate : " + "[ Reminder date : " + this.ReminderDate + " ,Remninder Time : " + this.ReminderTime + " ,UserId : " + this.UserId + " ,TaskId : " + this.TaskId +  " ]";
        }


    }
}
