using AuthService.Dtos;
using Grpc.Core;
using UserService.Grpc;

namespace AuthService.Services.Grpc.Client;

public class GrpcUserClient(UserValidation.UserValidationClient client) : IUserClient
{
    public async Task<UserDto?> ValidateUserCredentialsAsync(string username, string password)
    {
        try
        {
            var reply = await client.ValidateAsync(new LoginRequest
            {
                Username = username,
                Password = password
            });
            return new UserDto(
                Id: Guid.Parse(reply.Id),
                Username: reply.Username,
                Role: reply.Role
                );
        }
        catch (RpcException ex) when (ex.StatusCode == StatusCode.Unauthenticated)
        {
            return null;
        }
    }
}