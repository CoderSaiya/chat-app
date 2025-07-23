using UserService.Models;

namespace UserService.Services;

public interface IUserService
{
    Task<User?> GetValidUser(string username, string password);
}