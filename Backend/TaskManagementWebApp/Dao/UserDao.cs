using TaskManagementWebApp.DTO;
using TaskManagementWebApp.Models;

namespace TaskManagementWebApp.Dao
{
    public interface UserDao
    {
        // crud -- create -read -- update --delete
        public string registerUser(User user); // create


        public string addAdmin(User user);

        public UserLoginResponseDTO validateUser(string email, string password);  // read -- AuthenticateUser

        public List<User> getUserList(); // read


        public List<User> getAdminList();
        public string resetPasswordUsingDob(string email,DateOnly dob, string newPassword);  // update password

        public string resetPasswordUsingMobileNo(string email,string mobileNo, string newPassword);  // update password

        // getUserUsingUserId
        public User getUserUsingUserId(long userId);
        public string deleteUser(int userId); // delete  -- when user deleted its all task should also be deleted


        public string updateUser(User user,int userId);



        //public User getUser(int userId);

        // select name from [user] where id=2;

        public string getUserName(int userId);

        public long geUserIdByEmail(string email);


    }
}
