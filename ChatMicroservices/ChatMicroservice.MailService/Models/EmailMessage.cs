namespace ChatMicroservice.MailService.Models;

public abstract class EmailMessage
{
    public string To { get; set; } = null!;
    public string? Cc { get; set; }
    public string? Bcc { get; set; }
    public string Subject { get; set; } = null!;
    public string Body { get; set; } = null!;
}