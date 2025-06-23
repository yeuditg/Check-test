using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public enum EUserRole
    {
        Admin,
        User
    }
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string Email { get; set; }
        public string? Address { get;set; }
        public string Password { get; set; }
        public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
        public ICollection<Folder> Folders { get; set; } = new List<Folder>();

    }
}
