using System.Net;
using System.Net.Mail;


namespace TaskManagementWebApp.Service
{
   

    public class ReminderService
    {
        public void SendReminderEmail(string toEmail, string taskTitle,DateTime reminderTime,String userName)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("taskmanager.reminders@gmail.com", "uslu tkgw bors szic"),
                EnableSsl = true
            };

            

            var mail = new MailMessage("taskmanager.reminders@gmail.com", toEmail)
            {
                Subject = "📌 Task Reminder",
                //Body = $"⏰ Reminder: Your task \"{taskTitle}\" is scheduled for {reminderTime}"


                // upload image first on any website who host images then copy image url and paste below <img src="" -- here . by doing this image will be visible to user when user receive mail
                // public image hosting website exmaple -- https://imgur.com/ -- try on this website

                //    <img src='https://i.imgur.com/abc123.png' alt='TaskManager Logo' width='150' /> -- add in body

                Body = $@"
                            <html>
                                <body>
                                 <h3>⏰ Reminder: </h3>
                                    </hr>
                                   <p>Hi, {userName}</p>
                                    <p>Your task <b>{taskTitle}</b> is scheduled for <b>{DateOnly.FromDateTime(reminderTime)}</b></p>
                                    <p>Good luck! 💪<br/>– Task Manager App</p>
                                </body>
                            </html>",
                        IsBodyHtml = true

                 






            };

            client.Send(mail);
        }
    }

}
