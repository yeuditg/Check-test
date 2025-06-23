using Core.IRepositories;
using Core.IServices;
using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _managerRepository;

        public UserService(IRepositoryManager managerRepository)
        {
            _managerRepository = managerRepository;
        }
        public async Task AddUserAsync(User user)
        {
            // הוספת משתמש לבסיס הנתונים
            await _managerRepository.UserRepository.AddUserAsync(user);
            await _managerRepository.SaveChanges();
        }

        public async Task DeleteUserAsync(int id)
        {
            // מחיקת משתמש לפי מזהה
            await _managerRepository.UserRepository.DeleteUserAsync(id);
            await _managerRepository.SaveChanges();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            // קבלת משתמש לפי מזהה
            var res = await _managerRepository.UserRepository.GetUserByIdAsync(id);
            await _managerRepository.SaveChanges();
            return res;
        }

        public async Task<List<User>> GetUsersListAsync()
        {
            // קבלת רשימת משתמשים
            var res = await _managerRepository.UserRepository.GetAllUsersAsync();
            await _managerRepository.SaveChanges();
            return res;
        }
        public async Task UpdateUserAsync(User user,string token)
        {
            // עדכון משתמש בבסיס הנתונים
            await _managerRepository.UserRepository.UpdateUserAsync(token, user);
            await _managerRepository.SaveChanges();
        }


    }
}
