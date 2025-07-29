using UserService.Models;

namespace UserService.Services;

public interface IUserService
{
    Task<User?> GetValidUser(string username, string password);
    Task<User?> Create(string username, string password, string role);
}