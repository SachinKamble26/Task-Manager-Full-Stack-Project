namespace TaskManagementWebApp.DTO
{
    public class UserLoginResponseDTO
    {
       

        public UserLoginResponseDTO(long userId, string role)
        {
            this.Id = userId;
            this.Role = role;
        }

        public long Id { get; set; }

        public string Role { get; set; }


    }
}
