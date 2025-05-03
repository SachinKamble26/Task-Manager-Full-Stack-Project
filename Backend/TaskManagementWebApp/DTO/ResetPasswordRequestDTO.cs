namespace TaskManagementWebApp.DTO
{
    public class ResetPasswordRequestDTO
    {

        public string Email { get; set; }    
        public DateOnly Dob { get; set; }
        public string NewPassword { get; set; }
    }
}
