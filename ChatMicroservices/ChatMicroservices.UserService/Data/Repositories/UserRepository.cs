using ChatMicroservice.Shared.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using UserService.Models;
using UserService.Models.Specifications;

namespace UserService.Data.Repositories;

public class UserRepository(UserDbContext context) : GenericRepository<User>(context), IUserRepository
{
    public override async Task<IEnumerable<User>> ListAsync<TFilter>(TFilter filter, CancellationToken ct = default)
    {
        if (filter is not UserFilter f)
            return await base.ListAsync(filter, ct);

        IQueryable<User> query = context.Users.Include(u => u.Profile);

        if (!string.IsNullOrWhiteSpace(f.Username))
            query = query.Where(u => u.Username.Contains(f.Username));

        if (!string.IsNullOrWhiteSpace(f.Email))
            query = query.Where(u => u.Email != null && u.Email.Contains(f.Email));

        if (!string.IsNullOrWhiteSpace(f.FullName))
            query = query.Where(u => u.Profile.FullName.Contains(f.FullName));

        if (f.DateOfBirth != null)
            query = query.Where(u => u.Profile.DateOfBirth == f.DateOfBirth);

        // Sorting
        if (!string.IsNullOrWhiteSpace(f.SortBy))
        {
            if (f.SortBy.Equals("username", StringComparison.OrdinalIgnoreCase))
                query = f.SortDescending ? query.OrderByDescending(u => u.Username) : query.OrderBy(u => u.Username);
            else if (f.SortBy.Equals("email", StringComparison.OrdinalIgnoreCase))
                query = f.SortDescending ? query.OrderByDescending(u => u.Email) : query.OrderBy(u => u.Email);
        }

        // Paging
        if (f.Skip.HasValue)
            query = query.Skip(f.Skip.Value);

        if (f.Take.HasValue)
            query = query.Take(f.Take.Value);

        return await query.ToListAsync(ct);
    }

    public async Task<User?> GetByUsername(string username) =>
        await context.Users.FirstOrDefaultAsync(u => u.Username == username);
}