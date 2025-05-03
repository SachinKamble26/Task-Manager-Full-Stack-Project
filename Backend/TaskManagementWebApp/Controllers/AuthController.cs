using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TaskManagementWebApp.Dao;
using TaskManagementWebApp.DTO;

namespace TaskManagementWebApp.Controllers
{


    [ApiController]
    [Route("TaskManagement/[controller]")]
    public class AuthController : Controller
    {

        private UserDaoImpl userDao = new UserDaoImpl();
        private readonly string _key;

        public AuthController(IConfiguration config)
        {
            _key = "kSWSd1ZE4g4SrqGe89nmogPiS0CYpvh7";
        }

        // POST /api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogInRequestDTO userLogin)
        {
            // Simple username/password check (in production, check against a database)


            UserLoginResponseDTO  userLoginResponseDTO  =userDao.validateUser(userLogin.Email, userLogin.Password);

            if (userLoginResponseDTO!=null)
            {
                // Generate a JWT token for the user
                var token = GenerateJwtToken(userLogin.Email,userLoginResponseDTO.Id,userLoginResponseDTO.Role);
                return Ok(new { token });
            }

            // Return Badrequest if credentials are wrong (unauthorised not sended because we are checking unauthorised to check session expired or not)
            return BadRequest();
        }

        // Method to generate a JWT token
        private string GenerateJwtToken(string username,long userId,string userRole)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username), // Subject claim (the username)
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Unique token ID
                new Claim("userId", Convert.ToString(userId)),
                new Claim(ClaimTypes.Role, userRole),



            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key)); // Create key from the secret
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); // Sign the token using HMAC SHA256

            // Create the token
            var token = new JwtSecurityToken(
                issuer: null, // Not using issuer validation
                audience: null, // Not using audience validation
                claims: claims,
                expires: DateTime.Now.AddMinutes(20), // Token expiration time
                signingCredentials: creds // Include signing credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token); // Return the token as a string
        }
    }

}
