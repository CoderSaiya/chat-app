using System.ComponentModel.DataAnnotations;
using ChatMicroservice.Shared.Common;

namespace AuthService.Models;

public class RefreshToken : BaseEntity
{
    [Required]
    public required Guid UserId { get; set; }
    [Required]
    public required string Token { get; set; } = null!;
    [Required]
    public required DateTime ExpiryDate  { get; set; }
    public bool IsUsed { get; set; } = false;
    public bool IsRevoked { get; set; } = false;
}