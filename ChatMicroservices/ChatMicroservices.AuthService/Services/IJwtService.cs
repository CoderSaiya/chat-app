using System.Security.Claims;

namespace AuthService.Services;

public interface IJwtService
{
    string HashPassword(string password);
    bool VerifyPassword(string reqPass, string existPass);
    string GenerateAccessToken(IEnumerable<Claim> claims);
    string GenerateRefreshToken();
    
}