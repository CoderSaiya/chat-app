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

    public override async Task<RegisterResponse> Register(RegisterRequest request, ServerCallContext context)
    {
        var user = await userService.Create(request.Username, request.Password, request.Role);
        
        if (user is null)
            throw new RpcException(new Status(StatusCode.Unauthenticated, "Invalid info"));

        return new RegisterResponse
        {
            Id = user.Id.ToString(),
            Success = true,
            Message = "Created successfully"
        };
    }
}