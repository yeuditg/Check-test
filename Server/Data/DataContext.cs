using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Core.Models.File> Files { get; set; }
        public DbSet<Folder> Folders { get; set; }
        public DbSet<Classes> Classes { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<StudentTestFeedback> StudentsTestFeedbacks { get; set; }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //     optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=CheckTheTest");
        //}
        //public DataContext()
        //{
        //    Users = new DbSet<User>();
        //    Files = new DbSet<MyFile>();
        //}
    }
}
