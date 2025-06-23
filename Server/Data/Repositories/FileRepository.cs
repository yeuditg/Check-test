//using Core.IRepositories;
//using Core.Models;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Data.Repositories
//{
//    public class FileRepository : IFileRepository
//    {
//        private readonly DataContext _context;

//        public FileRepository(DataContext context)
//        {
//            _context = context;
//        }

//        public async Task<IEnumerable<Core.Models.File>> GetAllFilesAsync()
//        {
//            return await _context.Files.ToListAsync();
//        }

//        public async Task<Core.Models.File> GetFileByIdAsync(int id)
//        {
//            return await _context.Files.FindAsync(id);
//        }

//        public async Task<Core.Models.File> AddFileAsync(Core.Models.File newFile)
//        {
//            _context.Files.Add(newFile);
//            await _context.SaveChangesAsync();
//            return newFile;
//        }

//        public async Task<bool> UpdateFileAsync(Core.Models.File updatedFile)
//        {
//            _context.Entry(updatedFile).State = EntityState.Modified;
//            var result = await _context.SaveChangesAsync();
//            return result > 0;
//        }

//        public async Task<bool> DeleteFileAsync(int id)
//        {
//            var file = await _context.Files.FindAsync(id);
//            if (file == null)
//            {
//                return false;
//            }

//            _context.Files.Remove(file);
//            var result = await _context.SaveChangesAsync();
//            return result > 0;
//        }
//    }
//}
using Core.Models;
using Core.IRepositories;
using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly DataContext _context;

        public FileRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Core.Models.File>> GetAllFilesAsync()
        {
            return await _context.Files.ToListAsync();
        }

        public async Task<Core.Models.File> GetFileByIdAsync(int id)
        {
            return await _context.Files.FindAsync(id);
        }

        public async Task<Core.Models.File> CreateFileAsync(Core.Models.File newFile)
        {
            await _context.Files.AddAsync(newFile);
            return newFile;
        }

        public async Task<bool> UpdateFileAsync(Core.Models.File updatedFile)
        {
            _context.Entry(updatedFile).State = EntityState.Modified;
            return true;
        }

        public async Task<bool> DeleteFileAsync(int id)
        {
            var file = await _context.Files.FindAsync(id);
            if (file == null) return false;

            _context.Files.Remove(file);
            return true;
        }
        public async Task<IEnumerable<Core.Models.File>> GetFilesByUserIdAsync(int userId)
        {
            return await _context.Files
                .Where(f => f.UserId == userId)
                .ToListAsync();
        }

    }
}
