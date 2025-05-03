namespace TaskManagementWebApp.Models
{
    public class TaskPriority
    {
        // 'id','TaskPriorityStatus'
        private int Id { get; set; }
        private string TaskPriorityStatus { get; set; }    // default status will be "Low" , id=3
    }
}
