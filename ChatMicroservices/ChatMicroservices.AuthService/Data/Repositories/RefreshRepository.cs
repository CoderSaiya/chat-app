using AuthService.Models;
using ChatMicroservice.Shared.Persistence.Repositories;

namespace AuthService.Data.Repositories;

public class RefreshRepository(RefreshDbContext context) : GenericRepository<RefreshToken>(context), IRefreshRepository
{
    
}