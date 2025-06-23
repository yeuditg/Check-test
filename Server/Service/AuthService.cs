using Core.IRepositories;
using Core.IServices;
using Core.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;

namespace Service
{
    public class AuthService : IAuthService
    {
        private readonly IRepositoryManager _managerRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IRepositoryManager managerRepository, IConfiguration configuration)
        {
            _managerRepository = managerRepository;
            _configuration = configuration;
        }

        public async Task<(string token, User user)> LoginAsync(Login login)
        {
            try
            {
                var user = await _managerRepository.AuthRepository.GetUserByEmailAndPasswordAsync(login.Email, login.Password);

                if (user == null)
                {
                    throw new UnauthorizedAccessException("Invalid credentials.");
                }

                var token = GenerateJwtToken(user);
                await _managerRepository.SaveChanges();
                return (token, user);
            }
            catch (UnauthorizedAccessException)
            {
                throw new UnauthorizedAccessException("Invalid credentials.");
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred during login: " + ex.Message);
            }
        }

        public async Task<string> RegisterUserAsync(User user)
        {
            try
            {
                // Hash the password before saving to the database
                await _managerRepository.AuthRepository.CreateUserAsync(user);
                await _managerRepository.SaveChanges();

                // Generate JWT token after registration
                var token = GenerateJwtToken(user);
                return token;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred during registration: " + ex.Message);
            }
        }

        private string GenerateJwtToken(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "User cannot be null.");
            }

            if (string.IsNullOrEmpty(user.Email) || user.Id == 0)
            {
                throw new ArgumentException("User email or ID is not valid.");
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

                if (string.IsNullOrEmpty(_configuration["Jwt:Key"]) ||
                    string.IsNullOrEmpty(_configuration["Jwt:Issuer"]) ||
                    string.IsNullOrEmpty(_configuration["Jwt:Audience"]) ||
                    string.IsNullOrEmpty(_configuration["Jwt:ExpiryInDays"]))
                {
                    throw new InvalidOperationException("JWT configuration values are not set properly.");
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email)
                    }),
                    Expires = DateTime.UtcNow.AddDays(Convert.ToDouble(_configuration["Jwt:ExpiryInDays"])),
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while generating the token: " + ex.Message);
            }
        }
    }
}




