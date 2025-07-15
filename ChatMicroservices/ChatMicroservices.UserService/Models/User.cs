using System.ComponentModel.DataAnnotations;
using ChatMicroservice.Shared.Common;

namespace UserService.Models;

public abstract class User : BaseEntity
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string? Email { get; set; }
    
    public Profile Profile { get; set; } = null!;
}