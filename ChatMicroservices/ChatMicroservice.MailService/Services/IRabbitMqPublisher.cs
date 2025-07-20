using ChatMicroservice.MailService.Models;

namespace ChatMicroservice.MailService.Services;

public interface IRabbitMqPublisher
{
    void EnqueueMail(EmailMessage message);
}