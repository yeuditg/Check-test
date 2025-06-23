using Api.PostModel;
using AutoMapper;
using Core.IServices;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Org.BouncyCastle.Crypto.Generators;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;
    public AuthController(IUserService userService,IAuthService authService,IMapper mapper)
    {
        _userService = userService;
        _authService=authService;
        _mapper = mapper;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserPostModel userPostModel)
    {
        var userDto=_mapper.Map<User>(userPostModel);
        var token = await _authService.RegisterUserAsync(userDto);
        return Ok(new { Token = token });
    }
   
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login loginDto)
    {
        try
        {
          var (token,user) = await _authService.LoginAsync(loginDto);
            return Ok(new { Token = token, User= user });
        }
        catch(UnauthorizedAccessException)
        {
          return Unauthorized();
        }
    }
}
