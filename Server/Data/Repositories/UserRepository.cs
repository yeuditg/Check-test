using Core.IRepositories;
using Core.Models;
using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _context.Users.ToListAsync(); // עדכון לקריאה אסינכרונית
    }

    public async Task<User> GetUserByEmailAsync(string email) // שינוי לשם המתודולוגי
    {
        return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
    }

    public async Task AddUserAsync(User user) // שינוי לשם המתודולוגי
    {
        await _context.Users.AddAsync(user);
    }

    public async Task<User> GetUserByIdAsync(int id) // הוספת שיטה לאחזור משתמש לפי ID
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task UpdateUserAsync(string token, User user) // הוספת שיטה לעדכון משתמש
    {
        _context.Entry(user).State = EntityState.Modified;
    }

    public async Task DeleteUserAsync(int id) // הוספת שיטה למחיקת משתמש
    {
        var user = await _context.Users.FindAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
        }
    }
}
