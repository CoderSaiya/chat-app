using ChatMicroservice.Shared.Persistence.Repositories;
using UserService.Models;

namespace UserService.Data.Repositories;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetByUsername(string username);
};