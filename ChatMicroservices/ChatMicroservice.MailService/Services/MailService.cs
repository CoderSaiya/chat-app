using MailKit.Net.Smtp;
using ChatMicroservice.MailService.Models;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace ChatMicroservice.MailService.Services;

public class MailService(IOptions<EmailSettings> settings, ILogger<MailService> logger) : IMailService
{
    private readonly EmailSettings _settings = settings.Value;
    private readonly ILogger<MailService> _logger = logger;

    public async Task SendEmailAsync(EmailMessage emailMessage)
    {
        // tạo Mime
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_settings.FromName, _settings.FromAddress));
        message.To.Add(MailboxAddress.Parse(emailMessage.To));
        
        // thêm CC và BCC (nếu có)
        if (!string.IsNullOrEmpty(emailMessage.Cc))
            message.Cc.Add(MailboxAddress.Parse(emailMessage.Cc));
        if (!string.IsNullOrEmpty(emailMessage.Bcc))
            message.Bcc.Add(MailboxAddress.Parse(emailMessage.Bcc));
        
        message.Subject = emailMessage.Subject;
        message.Body = new TextPart("html")
        {
            Text = emailMessage.Body
        };
        
        // gửi mail qua SMTP
        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(_settings.SmtpHost, _settings.SmtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_settings.Username, _settings.Password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);

            _logger.LogInformation("Đã gửi email đến {To}", emailMessage.To);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi gửi email đến {To}", emailMessage.To);
            throw;
        }
    }
}