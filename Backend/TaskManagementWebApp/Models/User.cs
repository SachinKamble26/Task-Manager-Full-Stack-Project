using System.Text.Json.Serialization;

namespace TaskManagementWebApp.Models
{
    public class User
    {
        
        public User(int Id, string? Name, string? Email, string? Password, DateOnly Dob, string? MobileNo, string? Address, string? Role)
        {


            this.Id = Id;
            this.Name = Name;
            this.Email = Email;
            this.Password = Password;
            this.Dob = Dob;
            this.MobileNo = MobileNo;
            this.Address = Address;
            this.Role = Role;



        }




        public User()
        {
            

            
        }

        // 'id','name','email','password','dob','mobileno','address','role'

        //public User()
        //{

        //    this.taskList = new List<Task>();   
        //}


        [JsonIgnore]
        public long Id { get; set; }




        [JsonPropertyName("userId")]
        public long UserId 
        { 
        

            get { return this.Id; }
        }





        public string Name { get; set; }


        public string Email { get; set; }
        public string Password { get; set; }
        public DateOnly Dob { get; set; }

        public string MobileNo { get; set; }

        public string Address { get; set; }

        public string Role { get; set; }  // default user ,admin etc

        //[JsonIgnore]
        //public List<Task> taskList { get; set; }=new List<Task>();



        public string toString()
        {
            return "Task : " + "[ id : " + this.Id + " ,Name : " + this.Name + " ,Email : " + this.Email + " ,Password : " + this.Password + " ,Address : " + this.Address+ " ,Dob: " + this.Dob + " ,UserId : " + this.UserId + " ]";
        }


    }

}
