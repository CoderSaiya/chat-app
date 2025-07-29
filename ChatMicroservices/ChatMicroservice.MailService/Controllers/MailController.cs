using ChatMicroservice.MailService.Models;
using ChatMicroservice.MailService.Services;
using ChatMicroservice.Shared.Common;
using Microsoft.AspNetCore.Mvc;

namespace ChatMicroservice.MailService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MailController(IRabbitMqPublisher publisher) : Controller
{
    [HttpPost("send")]
    public IActionResult SendEmail([FromBody] EmailMessage? mailMessage)
    {
        if (mailMessage is null || string.IsNullOrEmpty(mailMessage.To))
            return BadRequest("Dữ liệu email không hợp lệ.");

        publisher.EnqueueMail(mailMessage);
        return Ok(GlobalResponse<string>.Success("Message enqueued"));
    }
}