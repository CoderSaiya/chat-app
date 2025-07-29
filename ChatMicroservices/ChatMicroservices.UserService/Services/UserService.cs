using UserService.Data.Repositories;
using UserService.Models;
using UserService.Models.ValueObjects;

namespace UserService.Services;

public class UserService(IUserRepository userRepository) : IUserService
{
    public async Task<User?> GetValidUser(string username, string password)
    {
        var user = await userRepository.GetByUsername(username);
        
        if (user is null || user.Password != password) 
            throw new Exception("Invalid username or password");
        
        return user;
    }

    public async Task<User?> Create(string username, string password, string role)
    {
        var user = await userRepository.GetByUsername(username);
        if (user is not null)
            throw new Exception("Username already exists");
        
        if (!Enum.TryParse(role, ignoreCase: true, out UserRole userRole))
            throw new Exception($"Invalid role: {role}");

        var newUser = new User
        {
            Username = username,
            Password = password,
            Role = userRole,
        };
        await userRepository.AddAsync(newUser);
        
        return newUser;
    }
}