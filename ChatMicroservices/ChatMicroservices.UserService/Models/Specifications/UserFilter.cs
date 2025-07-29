using ChatMicroservice.Shared.Common;

namespace UserService.Models.Specifications;

public abstract class UserFilter : Filter
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? FullName { get; set; }
    public DateTime? DateOfBirth { get; set; }
}