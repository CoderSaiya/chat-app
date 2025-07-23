using UserService.Models;

namespace UserService.Services;

public class UserService : IUserService
{
    public async Task<User?> GetValidUser(string username, string password)
    {
        throw new NotImplementedException();
    }
}