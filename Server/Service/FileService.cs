
using Core.Models;
using Core.IServices;
using Core.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Data;
using Data.Repositories;

namespace Service
{
    public class FileService : IFileService
    {
        private readonly IRepositoryManager _managerRepository;
        private readonly DataContext _context;

        public FileService(IRepositoryManager managerRepository, DataContext context)
        {
            _managerRepository = managerRepository;
            _context = context;
        }

        public async Task<List<Core.Models.File>> GetAllFilesAsync()
        {
            var res = await _context.Files.ToListAsync();
            return res;
        }

        public async Task<Core.Models.File> GetFileByIdAsync(int id)
        {
           var res= await _managerRepository.FileRepository.GetFileByIdAsync(id);
            await _managerRepository.SaveChanges();
            return res;
        }

        public async Task<Core.Models.File> CreateFileAsync(Core.Models.File newFile)
        {
            var res = await _managerRepository.FileRepository.CreateFileAsync(newFile);
            await _managerRepository.SaveChanges();
            return res;
        }

        public async Task<bool> UpdateFileAsync(Core.Models.File updatedFile)
        {
            var res = await _managerRepository.FileRepository.UpdateFileAsync(updatedFile);
            await _managerRepository.SaveChanges();
            return res;
        }

        public async Task<bool> DeleteFileAsync(int id)
        {
            var res = await _managerRepository.FileRepository.DeleteFileAsync(id);
            await _managerRepository.SaveChanges();
            return res;
        }
        public async Task<IEnumerable<Core.Models.File>> GetFilesByUserIdAsync(int userId)
        {
            return await _managerRepository.FileRepository.GetFilesByUserIdAsync(userId);
        }

    }
}
