using ChatMicroservice.Shared.Common;
using UserService.Models.ValueObjects;

namespace UserService.Models;

public abstract class User : BaseEntity
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string? Email { get; set; }
    public UserRole Role { get; set; } = UserRole.Client;
    
    public Profile Profile { get; set; } = null!;
}