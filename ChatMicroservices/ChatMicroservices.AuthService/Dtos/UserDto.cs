namespace AuthService.Dtos;

public record UserDto(
    Guid Id,
    string Username,
    string Role
    );