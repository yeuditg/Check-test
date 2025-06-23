using Core.Models;
using Core.IRepositories;
using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class FolderRepository : IFolderRepository
    {
        private readonly DataContext _context;

        public FolderRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Folder>> GetByUserIdAsync(int userId)
        {
            return await _context.Folders.Where(f => f.userId == userId).ToListAsync();
        }
        public async Task<IEnumerable<Folder>> GetAllFoldersAsync()
        {
            return await _context.Folders.Include(f => f.Classes).Include(f => f.test).ToListAsync();
        }

        public async Task CreateFolderAsync(Folder folder)
        {
            await _context.Folders.AddAsync(folder);
        }

        public async Task<bool> UpdateFolderAsync(Folder updatedFolder)
        {
            _context.Entry(updatedFolder).State = EntityState.Modified;
            return true;
        }

        public async Task<bool> DeleteFolderAsync(int id)
        {
            var folder = await _context.Folders.FindAsync(id);
            if (folder == null) return false;

            _context.Folders.Remove(folder);
            return true;
        }
    }
}
