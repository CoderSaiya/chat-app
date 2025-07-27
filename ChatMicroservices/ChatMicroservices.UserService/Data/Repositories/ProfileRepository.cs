using ChatMicroservice.Shared.Persistence.Repositories;
using UserService.Models;

namespace UserService.Data.Repositories;

public class ProfileRepository(UserDbContext context) : GenericRepository<Profile>(context), IProfileRepository
{
    
}