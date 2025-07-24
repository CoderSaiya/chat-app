using System.Security.Claims;
using AuthService.Dtos;
using AuthService.Services;
using AuthService.Services.Grpc.Client;
using ChatMicroservice.Shared.Common;
using Microsoft.AspNetCore.Mvc;
using UserService.Grpc;

namespace AuthService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IUserClient userClient, IJwtService jwtService) : Controller
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await userClient.ValidateUserCredentialsAsync(request.Username, request.Password);
        if (user == null) return Unauthorized("Invalid credentials");
        
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToLower()),
        };
        
        var accessToken = jwtService.GenerateAccessToken(claims);
        var refreshToken = jwtService.GenerateRefreshToken();
        return Ok(GlobalResponse<TokenDto>.Success(new TokenDto(accessToken, refreshToken)));
    }
}