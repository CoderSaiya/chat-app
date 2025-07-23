using Grpc.Core;
using UserService.Grpc;

namespace UserService.Services.Grpc.Server;

public class UserValidationService(IUserService userService) : UserValidation.UserValidationBase
{
    public override async Task<UserResponse> Validate(LoginRequest request, ServerCallContext context)
    {
        var user = await userService.GetValidUser(request.Username, request.Password);
        if (user == null)
            throw new RpcException(new Status(StatusCode.Unauthenticated, "Invalid credentials"));

        return new UserResponse
        {
            Id = user.Id.ToString(),
            Username = user.Username,
            Role = user.Role.ToString()
        };
    }
}