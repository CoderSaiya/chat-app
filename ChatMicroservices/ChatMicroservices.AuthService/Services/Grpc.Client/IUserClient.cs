using AuthService.Dtos;

namespace AuthService.Services.Grpc.Client;

public interface IUserClient
{
    Task<UserDto?> ValidateUserCredentialsAsync(string username, string password);
}