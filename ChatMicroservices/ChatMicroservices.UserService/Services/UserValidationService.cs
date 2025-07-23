using Grpc.Core;
using UserService.Grpc;

namespace UserService.Services;

public class UserValidationService : UserValidation.UserValidationBase
{
    public override Task<UserResponse> Validate(LoginRequest request, ServerCallContext context)
    {
        return base.Validate(request, context);
    }
}