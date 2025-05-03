
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using TaskManagementWebApp.DTO;
using TaskManagementWebApp.Models;

namespace TaskManagementWebApp.Dao
{
    public class UserDaoImpl : UserDao
    {

        private string connectionString = "Data Source=localhost\\sqlexpress01;Initial Catalog=TaskManagement;Integrated Security=True;Encrypt=False";

     

        public string registerUser(User user)
        {

            try
            {

                SqlConnection sqlConnection = new SqlConnection(connectionString);
                sqlConnection.Open();

                string query = "insert into [user] (name,email,password,dob,mobileno,address,role) values (@Name,@Email,@Password,@Dob,@MobileNo,@Address,@Role)";

                SqlCommand cmd = new SqlCommand(query, sqlConnection);
                cmd.Parameters.AddWithValue("@Name", user.Name);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                cmd.Parameters.AddWithValue("@Dob", user.Dob);
                cmd.Parameters.AddWithValue("@MobileNo", user.MobileNo);
                cmd.Parameters.AddWithValue("@Address", user.Address);
                cmd.Parameters.AddWithValue("@Role", user.Role);
                int rowAffected = cmd.ExecuteNonQuery();

                if (rowAffected > 0)
                    return "user registered";
                else return "user registration failed";

            }
            catch (Exception ex)
            {
                return "An error occured while registering user : "+ex.Message;
            }
        }


        public string deleteUser(int userId)
        {
            TaskDaoImpl taskDao = new TaskDaoImpl();
            string result=taskDao.deleteAllTask(userId);
            Console.WriteLine(result);  
            try
            {


                using(SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "delete from [user] where id= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query,sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        int rowAffected=cmd.ExecuteNonQuery();
                        return rowAffected > 0 ? "user deleted successfuilly" : "user with userId : "+userId+" does not exist !";
                    }
                }


            }
            catch (Exception ex)
            {
                return "An error occured while deleting user : " + ex.Message;
            }
            //return "user deleted";
        }

        public List<User> getUserList()
        {


            //Console.WriteLine("Testing get user id by email : "+ this.geUserIdByEmail("abc@gmail.com"));


            List<User> usersList = new List<User>();

            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from [user] where role= @Role";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@Role", "user");
                        SqlDataReader sqlDataReader=cmd.ExecuteReader();
                    
                    while (sqlDataReader.Read())
                        {

                            User user = new User( Convert.ToInt32(sqlDataReader["Id"]), Convert.ToString(sqlDataReader["Name"]), Convert.ToString(sqlDataReader["Email"]), Convert.ToString(sqlDataReader["Password"]), DateOnly.FromDateTime(   Convert.ToDateTime(sqlDataReader["Dob"])), Convert.ToString(sqlDataReader["MobileNo"]), Convert.ToString(sqlDataReader["Address"]), Convert.ToString(sqlDataReader["Role"])  );

                            usersList.Add(user);
                        }
                    
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while getting All Users List : " + ex.Message);
            }
            //return "user list retrived";

            return usersList;
        }

        public string resetPasswordUsingDob(string email, DateOnly dob,string newPassword)
        {

            long userId=this.geUserIdByEmail(email);


            if (userId == 0)
            {

                return "invalidEmail";
            }
            else
            {




                User user = this.getUserUsingUserId(userId);

                try
                {
                    using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                    {
                        sqlConnection.Open();
                        string query = "update [user] set password= @NewPassword where id= @UserId and dob= @Dob";
                        using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                        {
                            cmd.Parameters.AddWithValue("@UserId", userId);
                            cmd.Parameters.AddWithValue("@Dob", dob);
                            cmd.Parameters.AddWithValue("@NewPassword", newPassword);


                            if (user != null && user.Dob.Equals(dob))
                            {
                                int rowAffected = cmd.ExecuteNonQuery();




                                //return rowAffected > 0 ? "User password reseted succesfully " : "Resetting user password failed ! !";

                                return rowAffected > 0 ? "success" : "fail";



                            }
                            else
                            {
                                //return "Date of birth is invalid !! . Please try again .";
                                return "fail";

                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An error occured while resiting user password using dob : " + ex.Message);

                    return "fail";

                }
            }

            //return "user password reseted ";
        }

        public UserLoginResponseDTO validateUser(string email,string password)
        {

            UserLoginResponseDTO userLoginResponseDTO = null ; 

            User user = null;
            //long userid = -1;

            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from [user] where email= @Email and password= @Password";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue ("@Email", email);
                        cmd.Parameters.AddWithValue("@Password", password);
                          SqlDataReader sqlDataReader =cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {
                            user= new User(Convert.ToInt32(sqlDataReader["Id"]), Convert.ToString(sqlDataReader["Name"]), Convert.ToString(sqlDataReader["Email"]), Convert.ToString(sqlDataReader["Password"]), DateOnly.FromDateTime(Convert.ToDateTime(sqlDataReader["Dob"])), Convert.ToString(sqlDataReader["MobileNo"]), Convert.ToString(sqlDataReader["Address"]), Convert.ToString(sqlDataReader["Role"]));

                            userLoginResponseDTO = new UserLoginResponseDTO(user.UserId,user.Role);

                           
                        }
                        // User LogIn Failed. User does Not Exist !! 
                        // "User Logged In SuccessFully

                       

                      



                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine( "An error occured while validating, logging, authenticating user : " + ex.Message);
            }
            //return "logged in succesfully";


            return userLoginResponseDTO;
        }











        public User getUserUsingUserId(long userId)
        {


            User user = null;

            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from [user] where id= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                       SqlDataReader sqlDataReader = cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {
 // User(int Id, string? Name, string? Email, string? Password, DateOnly Dob, string? MobileNo, string? Address, string? Role)


                            user = new User(Convert.ToInt32(sqlDataReader["Id"]), Convert.ToString(sqlDataReader["Name"]), Convert.ToString(sqlDataReader["Email"]), Convert.ToString(sqlDataReader["Password"]), DateOnly.FromDateTime(Convert.ToDateTime(sqlDataReader["Dob"])), Convert.ToString(sqlDataReader["MobileNo"]), Convert.ToString(sqlDataReader["Address"]), Convert.ToString(sqlDataReader["Role"]));
                        }

                        Console.WriteLine(user.ToString());

                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine( "An error occured while registering user : " + ex.Message);
            }
            return user;




        }




        public string updateUser(User user, int userId)
        {

            /*  "userId": 1,
    "name": "sachin pralhad kamble",
    "email": "sachin@gmail.com",
    "password": "sachin#123",
    "dob": "2025-04-07",
    "mobileNo": "5698238654",
    "address": "parbhani",
    "role": "user"*/



            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "update [user] set name= @Name,email= @Email,mobileno= @MobileNo, address= @Address  where id= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@Name", user.Name);
                        cmd.Parameters.AddWithValue("@Email", user.Email);
                        cmd.Parameters.AddWithValue("@MobileNo", user.MobileNo);
                        cmd.Parameters.AddWithValue("@Address", user.Address);


                        int rowAffected = cmd.ExecuteNonQuery();
                        return rowAffected > 0 ? "user updated successfuilly" : "user updation fails !";


                    }

                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while registering user : " + ex.Message);
                return "An error occured while updating user";
            }

           


        }

        public List<User> getAdminList()
        {
            List<User> usersList = new List<User>();

            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select * from [user] where role= @Role";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@Role", "admin");
                        SqlDataReader sqlDataReader = cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {

                            User user = new User(Convert.ToInt32(sqlDataReader["Id"]), Convert.ToString(sqlDataReader["Name"]), Convert.ToString(sqlDataReader["Email"]), Convert.ToString(sqlDataReader["Password"]), DateOnly.FromDateTime(Convert.ToDateTime(sqlDataReader["Dob"])), Convert.ToString(sqlDataReader["MobileNo"]), Convert.ToString(sqlDataReader["Address"]), Convert.ToString(sqlDataReader["Role"]));

                            usersList.Add(user);
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while getting All Users List : " + ex.Message);
            }
            //return "user list retrived";

            return usersList;
        }

        public string addAdmin(User user)
        {
            try
            {

                SqlConnection sqlConnection = new SqlConnection(connectionString);
                sqlConnection.Open();

                string query = "insert into [user] (name,email,password,dob,mobileno,address,role) values (@Name,@Email,@Password,@Dob,@MobileNo,@Address,@Role)";

                SqlCommand cmd = new SqlCommand(query, sqlConnection);
                cmd.Parameters.AddWithValue("@Name", user.Name);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                cmd.Parameters.AddWithValue("@Dob", user.Dob);
                cmd.Parameters.AddWithValue("@MobileNo", user.MobileNo);
                cmd.Parameters.AddWithValue("@Address", user.Address);
                cmd.Parameters.AddWithValue("@Role","Admin");
                int rowAffected = cmd.ExecuteNonQuery();

                if (rowAffected > 0)
                    return "admin registered";
                else return "admin registration failed";

            }
            catch (Exception ex)
            {
                return "An error occured while registering admin : " + ex.Message;
            }
        }

        public string getUserName(int userId)
        {
            string name = "";
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    string query = "select name from [user] where id= @UserId";
                    using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        SqlDataReader sqlDataReader = cmd.ExecuteReader();

                        while (sqlDataReader.Read())
                        {

                            name = Convert.ToString(sqlDataReader["Name"]);

                            
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured while getting user name using userid : " + ex.Message);
            }
            //return "user list retrived";

            return name;
        }

        public string resetPasswordUsingMobileNo(string email, string mobileNo, string newPassword)
        {


            long userId = this.geUserIdByEmail(email);


            if (userId == 0)
            {

                return "invalidEmail";
            }
            else
            {



                User user = this.getUserUsingUserId(userId);

                try
                {
                    using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                    {
                        sqlConnection.Open();
                        string query = "update [user] set password= @NewPassword where id= @UserId and mobileno= @MobileNo";
                        using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
                        {
                            cmd.Parameters.AddWithValue("@UserId", userId);
                            cmd.Parameters.AddWithValue("@MobileNo", mobileNo);
                            cmd.Parameters.AddWithValue("@NewPassword", newPassword);


                            if (user != null && user.MobileNo.Equals(mobileNo))
                            {
                                int rowAffected = cmd.ExecuteNonQuery();




                                //return rowAffected > 0 ? "User password reseted succesfully " : "Resetting user password failed ! !";

                                return rowAffected > 0 ? "success" : "fail";



                            }
                            else
                            {
                                //return "Date of birth is invalid !! . Please try again .";
                                return "fail";

                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("An error occured while resiting user password using dob : " + ex.Message);

                    return "fail";

                }

            }
        }

        public long geUserIdByEmail(string email)
        {
            long userId = 0;    

            try
            {


                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();

                    string query = "select id from [user] where email= @Email";

                    using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                    {
                        sqlCommand.Parameters.AddWithValue("@Email", email);
                        SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                        while (sqlDataReader.Read())
                        {
                            userId = Convert.ToInt32(sqlDataReader["Id"]);

                        }


                      




                    }
                  
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
            }

            return userId;


        }

        //public User getUser(int userId)
        //{

        //    User user = null;

        //    try
        //    {
        //        using (SqlConnection sqlConnection = new SqlConnection(connectionString))
        //        {
        //            sqlConnection.Open();
        //            string query = "select * from [user] where id= @UserId";
        //            using (SqlCommand cmd = new SqlCommand(query, sqlConnection))
        //            {
        //                cmd.Parameters.AddWithValue("UserId", userId);
        //                SqlDataReader sqlDataReader = cmd.ExecuteReader();

        //                while (sqlDataReader.Read())
        //                {

        //                     user = new User(Convert.ToInt32(sqlDataReader["Id"]), Convert.ToString(sqlDataReader["Name"]), Convert.ToString(sqlDataReader["Email"]), Convert.ToString(sqlDataReader["Password"]), DateOnly.FromDateTime(Convert.ToDateTime(sqlDataReader["Dob"])), Convert.ToString(sqlDataReader["MobileNo"]), Convert.ToString(sqlDataReader["Address"]), Convert.ToString(sqlDataReader["Role"]));


        //                }

        //            }
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("An error occured while getting  user using Userid : " + ex.Message);
        //    }
        //    //return "user list retrived";

        //    return user;
        //}
    }
}
