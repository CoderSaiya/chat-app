using System.ComponentModel.DataAnnotations.Schema;
using ChatMicroservice.Shared.Common;

namespace UserService.Models;

public abstract class Profile : BaseEntity
{
    public Guid UserId { get; set; }
    [ForeignKey("UserId")]
    public User User { get; set; } = null!;
    
    public string FullName { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Bio { get; set; }
}