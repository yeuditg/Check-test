using Core.IServices;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Service;

using MimeKit;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
        [ApiController]
        [Route("api/[controller]")]
        public class EmailController : ControllerBase
        {
        //    [HttpPost("send")]
        //    public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        //    {
        //        var message = new MimeMessage();
        //        message.From.Add(new MailboxAddress("Your Name", "your-email@example.com"));
        //        message.To.Add(new MailboxAddress(request.RecipientName, request.RecipientEmail));
        //        message.Subject = request.Subject;
        //        message.Body = new TextPart("plain")
        //        {
        //            Text = request.Body
        //        };

        //        using (var client = new SmtpClient())
        //        {
        //            await client.ConnectAsync("smtp.example.com", 587, false);
        //            await client.AuthenticateAsync("your-email@example.com", "your-email-password");
        //            await client.SendAsync(message);
        //            await client.DisconnectAsync(true);
        //        }

        //        return Ok("Email sent successfully");
        //    }
        //}

        //public class EmailRequest
        //{
        //    public string RecipientName { get; set; }
        //    public string RecipientEmail { get; set; }
        //    public string Subject { get; set; }
        //    public string Body { get; set; }
        }

}
