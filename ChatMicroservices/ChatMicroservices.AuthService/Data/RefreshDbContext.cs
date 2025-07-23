using Microsoft.EntityFrameworkCore;

namespace AuthService.Data;

public class RefreshDbContext(DbContextOptions<RefreshDbContext> options) : DbContext(options)
{

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Constrains

        // Relations
        
    }
}