using System.Text;
using System.Text.Json;
using ChatMicroservice.MailService.Models;
using ChatMicroservice.Shared.Common;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace ChatMicroservice.MailService.Services;

public class RabbitMqPublisher(IOptions<RabbitMqSettings> settings) : IRabbitMqPublisher
{
    private readonly RabbitMqSettings _settings = settings.Value;
    
    public void EnqueueMail(EmailMessage message)
    {
        var factory = new ConnectionFactory
        {
            HostName = _settings.Host,
            Port = _settings.Port,
            UserName = _settings.Username,
            Password = _settings.Password
        };
        using var connection = factory.CreateConnection();
        using var channel = connection.CreateModel();
        channel.QueueDeclare(queue: _settings.QueueName, durable: true, exclusive: false, autoDelete: false, arguments: null);
        
        var json = JsonSerializer.Serialize(message);
        var body = Encoding.UTF8.GetBytes(json);

        var properties = channel.CreateBasicProperties();
        properties.Persistent = true;

        channel.BasicPublish(exchange: "", routingKey: _settings.QueueName, basicProperties: properties, body: body);
    }
}