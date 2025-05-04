using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementWebApp.Dao;
using TaskManagementWebApp.DTO;
using TaskManagementWebApp.Models;

namespace TaskManagementWebApp.Controllers
{
    [ApiController]
    [Route("TaskManagement/[controller]")]
    public class UserController : Controller
    {

        //private UserDaoImpl userDao=new UserDaoImpl();



     
        private UserDao userDao = null;




        public UserController(UserDao userDao)
        {
          
            this.userDao = userDao;

        }






        [Authorize]
        [HttpDelete("deleteUser")]
        public IActionResult deleteUser([FromQuery]int userId)
        {


            Console.WriteLine("In delete user :: ");

            //return Json("user deleted");
            return Json(userDao.deleteUser(userId));
        }



   



        [HttpPost("registerUser")]
        public IActionResult registerUser([FromBody] User user)
        {
           

            //userDao.registerUser(user);


            //return Json("user registered");
            return Json(userDao.registerUser(user));
        }


        [Authorize]
        [HttpPost("addAdmin")]
        public IActionResult addAdmin(User user)
        {

            return Json(userDao.addAdmin(user));
        }

        [HttpPost("authenticateUser")]
        public IActionResult authenticateUser([FromBody] UserLogInRequestDTO userLogInRequestDTO)
        {

            //return Json("logged in succesfully");

            Console.WriteLine("Login Credentails :: email : "+userLogInRequestDTO.Email + " password : " + userLogInRequestDTO.Password);


            UserLoginResponseDTO   userLoginResponseDTO = userDao.validateUser(userLogInRequestDTO.Email, userLogInRequestDTO.Password);


            if(userLoginResponseDTO==null)
            {

                return BadRequest("Invalid username or password.");
             
            }   else
            {
                return Json(userLoginResponseDTO);
            }

        }


        [Authorize]
        [HttpGet("getUser")]
        public IActionResult getUser([FromQuery] int userId)
        {
            return Json(userDao.getUserUsingUserId(userId));
        }




        [Authorize]
        [HttpGet("getAdminList")]
        public IActionResult getAdminList()

        {

            return Json(userDao.getAdminList());
        }


        [Authorize]
        [HttpGet("getUserName")]
        public IActionResult getUserName([FromQuery]int userId)
        {
            return Json(userDao.getUserName(userId));
        }


        
        [Authorize]
        [HttpGet("getUserList")]
        public IActionResult getUserList()
        {

            //return Json("user list retrived");
            return Json(userDao.getUserList());
        }





        [Authorize]
        [HttpPatch("updateUser")]
       public IActionResult updateUser([FromBody] User user,[FromQuery] int userId)
        {

            return Json(userDao.updateUser(user,userId));

        }



        [HttpPatch("resetPasswordUsingDob")]
        public IActionResult resetPasswordUsingDob([FromBody] ResetPasswordRequestDTO resetPasswordRequestDTO)
        {

            //return Json("user password reseted ");

           string result= userDao.resetPasswordUsingDob(resetPasswordRequestDTO.Email, resetPasswordRequestDTO.Dob, resetPasswordRequestDTO.NewPassword);
            
            // invalidEmail
            // success
            // fail -- invalid dob

            if (result.Equals("success"))
            {
                return Ok(new { message = "Password reset successfully. Please log in to continue!" });
            }
            else if (result.Equals("invalidEmail"))
            {
                return BadRequest("Invalid email id. Please enter registered email id!");
            }
            else  // fail
            {
                return BadRequest("Invalid date of birth. Please enter valid Date of birth!");
            }


        }




        // int userId, string mobileNo, string newPassword


        [HttpPatch("resetPasswordUsingMobileno")]
        public IActionResult resetPasswordUsingMobileNo([FromBody] ResetPasswordUsingMobileNoRequestDTO resetPasswordUsingMobileNoRequestDTO)
        {

            //return Json("user password reseted ");

            string result = userDao.resetPasswordUsingMobileNo(resetPasswordUsingMobileNoRequestDTO.Email, resetPasswordUsingMobileNoRequestDTO.MobileNo, resetPasswordUsingMobileNoRequestDTO.NewPassword);

            // invalidEmail
            // success
            // fail -- invalid mobile no

            if (result.Equals("success"))
            {
                return Ok( new { message="Password reset successfully. Please log in to continue!" });
            }
            else if (result.Equals("invalidEmail"))
            {
                return BadRequest("Invalid email id. Please enter registered email id!");
            }
            else  // fail
            {
                return BadRequest("Invalid mobile no. Please enter registered mobile no!");
            }


        }









    }
}
