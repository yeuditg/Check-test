using Core.Models;
using Core.IServices;
using Core.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Data;
using Microsoft.EntityFrameworkCore;
using Data.Repositories;

namespace Service
{
    public class FolderService : IFolderService
    {
        private readonly IRepositoryManager _managerRepository;
        public FolderService(IRepositoryManager managerRepository)
        {
            _managerRepository = managerRepository;
        }
        public async Task<IEnumerable<Folder>> GetFoldersByUserIdAsync(int userId)
        {
            return await _managerRepository.FolderRepository.GetByUserIdAsync(userId);
        }

        public async Task<IEnumerable<Folder>> GetAllFoldersAsync()
        {
            var res = await _managerRepository.FolderRepository.GetAllFoldersAsync();
            await _managerRepository.SaveChanges();
            return res;
        }
        public async Task CreateFolderAsync(Folder folder, int userId)
        {
            await _managerRepository.FolderRepository.CreateFolderAsync(folder);
            _managerRepository.UserRepository.GetUserByIdAsync(userId).Result.Folders.Add(folder);
            await _managerRepository.SaveChanges();
        }

        public async Task<bool> UpdateFolderAsync(Folder updatedFolder)
        {
            var res = await _managerRepository.FolderRepository.UpdateFolderAsync(updatedFolder);
            await _managerRepository.SaveChanges();
            return res;
        }

        public async Task<bool> DeleteFolderAsync(int id)
        {
            var res = await _managerRepository.FolderRepository.DeleteFolderAsync(id);
            await _managerRepository.SaveChanges();
            return res;

        }
    }
}
