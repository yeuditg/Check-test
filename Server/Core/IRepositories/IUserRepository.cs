using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.IRepositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email); 
        Task<List<User>> GetAllUsersAsync();
        Task AddUserAsync(User user); 
        Task<User> GetUserByIdAsync(int id); 
        Task UpdateUserAsync(string token, User user); 
        Task DeleteUserAsync(int id);
    }
}
