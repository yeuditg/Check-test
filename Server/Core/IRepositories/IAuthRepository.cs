using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IRepositories;

public interface IAuthRepository
{
    Task<User> CreateUserAsync(User user);
    Task<User> GetUserByEmailAndPasswordAsync(string email, string password);
    Task<User> GetUserByMail(string email);

}

