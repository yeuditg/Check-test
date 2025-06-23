using System.Threading.Tasks;
using Core.Models;

namespace Core.IServices
{
    public interface IAuthService
    {
        Task<(string token, User user)> LoginAsync(Login login); // התחברות
        Task<string> RegisterUserAsync(User user); // הרשמה
    }
}
