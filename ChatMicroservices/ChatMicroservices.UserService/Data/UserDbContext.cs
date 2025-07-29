using Microsoft.EntityFrameworkCore;
using UserService.Models;

namespace UserService.Data;

public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Profile> Profiles => Set<Profile>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Constrains
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);

            entity.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(256);

            entity.Property(u => u.Email)
                .HasMaxLength(255);

            // Relations
            entity.OwnsOne(u => u.Profile, profile =>
            {
                profile.Property(p => p.FullName)
                    .IsRequired()
                    .HasMaxLength(200);

                profile.Property(p => p.AvatarUrl)
                    .HasMaxLength(500);

                profile.Property(p => p.DateOfBirth);
                profile.Property(p => p.Bio)
                    .HasMaxLength(1000);
            });
        });
    }
}