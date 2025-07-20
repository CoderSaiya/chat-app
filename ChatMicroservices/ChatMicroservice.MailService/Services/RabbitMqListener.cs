using System.Text;
using System.Text.Json;
using ChatMicroservice.MailService.Models;
using ChatMicroservice.Shared.Common;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace ChatMicroservice.MailService.Services;

public class RabbitMqListener : BackgroundService
{
    private readonly RabbitMqSettings _settings;
    private readonly MailService _mailService;
    private readonly ILogger<RabbitMqListener> _logger;
    private IConnection? _connection;
    private IModel? _channel;

    public RabbitMqListener(IOptions<RabbitMqSettings> settings, MailService mailService, ILogger<RabbitMqListener> logger)
    {
        _settings = settings.Value;
        _mailService = mailService;
        _logger = logger;

        InitializeRabbitMqListener();
    }
    
    private void InitializeRabbitMqListener()
    {
        var factory = new ConnectionFactory()
        {
            HostName = _settings.Host,
            Port = _settings.Port,
            UserName = _settings.Username,
            Password = _settings.Password
        };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();

        // tạo queue nếu chưa có (durable để lưu khi RabbitMQ restart)
        _channel.QueueDeclare(queue: _settings.QueueName,
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: null);

        _logger.LogInformation("Connected to RabbitMQ queue {Queue}", _settings.QueueName);
    }
    
    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel!);
            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                _logger.LogInformation("Nhận message từ queue: {Message}", message);

                // Deserialize JSON thành EmailMessage
                EmailMessage? emailMessage = null;
                try
                {
                    emailMessage = JsonSerializer.Deserialize<EmailMessage>(message);
                }
                catch (JsonException ex)
                {
                    _logger.LogError(ex, "Dữ liệu message không đúng định dạng JSON");
                    // Bỏ qua message nếu không parse được
                    _channel!.BasicAck(ea.DeliveryTag, false);
                    return;
                }

                if (emailMessage != null)
                {
                    try
                    {
                        // Gửi email (thử tối đa 3 lần nếu có lỗi)
                        int attempts = 0;
                        const int maxAttempts = 3;
                        bool sent = false;
                        while (!sent && attempts < maxAttempts)
                        {
                            try
                            {
                                attempts++;
                                await _mailService.SendEmailAsync(emailMessage);
                                sent = true;
                                _logger.LogInformation("Gửi email thành công (lần thứ {Attempt})", attempts);
                            }
                            catch (Exception ex)
                            {
                                _logger.LogWarning(ex, "Thử lại gửi email lần {Attempt} sau lỗi", attempts);
                                // Chờ 2s trước khi thử lại (ví dụ)
                                await Task.Delay(2000, stoppingToken);
                            }
                        }
                        if (!sent)
                        {
                            _logger.LogError("Gửi email thất bại sau {Attempts} lần thử", maxAttempts);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Lỗi không xác định khi xử lý gửi email");
                    }
                }

                // Xác nhận đã xử lý message
                _channel!.BasicAck(ea.DeliveryTag, false);
            };

            _channel.BasicConsume(queue: _settings.QueueName,
                                  autoAck: false,
                                  consumer: consumer);

            return Task.CompletedTask;
    }
    
    public override void Dispose()
    {
        _channel?.Close();
        _connection?.Close();
        base.Dispose();
    }
}