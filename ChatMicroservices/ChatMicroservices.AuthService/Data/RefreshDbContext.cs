using AuthService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Data;

public class RefreshDbContext(DbContextOptions<RefreshDbContext> options) : DbContext(options)
{
    public DbSet<RefreshToken> Users => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Constrains
        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.UserId)
                .IsRequired();

            entity.Property(e => e.Token)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(e => e.ExpiryDate)
                .IsRequired();
            
            entity.Property(e => e.IsUsed)
                .HasDefaultValue(false);

            entity.Property(e => e.IsRevoked)
                .HasDefaultValue(false);
            
            entity.HasIndex(e => e.Token)
                .IsUnique()
                .HasDatabaseName("IX_RefreshToken_Token");

            entity.HasIndex(e => e.UserId)
                .HasDatabaseName("IX_RefreshToken_UserId");
        });

        // Relations
        
    }
}