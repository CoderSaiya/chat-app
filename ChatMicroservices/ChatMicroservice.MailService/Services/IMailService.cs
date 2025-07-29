using ChatMicroservice.MailService.Models;

namespace ChatMicroservice.MailService.Services;

public interface IMailService
{
    Task SendEmailAsync(EmailMessage emailMessage);
}