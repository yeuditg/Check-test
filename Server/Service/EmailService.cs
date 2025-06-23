using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
        public class EmailService
        {
            //public async Task SendEmailAsync(string email, string password)
            //{
            //    var message = new MimeMessage();
            //    message.From.Add(new MailboxAddress("Your Name", "your-email@example.com"));
            //    message.To.Add(new MailboxAddress("", email));
            //    message.Subject = "Your Password";
            //    message.Body = new TextPart("plain")
            //    {
            //        Text = $"Your password is: {password}"
            //    };

            //    using (var client = new SmtpClient())
            //    {
            //        object value = await client.ConnectAsync("smtp.example.com", 587, false);
            //        await client.AuthenticateAsync("your-email@example.com", "your-email-password");
            //        await client.SendAsync(message);
            //        await client.DisconnectAsync(true);
            //    }
            //}
        }
}

