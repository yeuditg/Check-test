using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.IServices
{
    public interface IUserService
    {
        Task AddUserAsync(User user); // הוספת משתמש
        Task DeleteUserAsync(int id); // מחיקת משתמש
        Task<User> GetUserByIdAsync(int id); // קבלת משתמש לפי מזהה
        Task<List<User>> GetUsersListAsync(); // קבלת רשימת משתמשים
        Task UpdateUserAsync(User user,string token); // עדכון משתמש
    }
}
