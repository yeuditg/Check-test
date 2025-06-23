using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.IServices
{
    public interface IFolderService
    {
        Task<IEnumerable<Folder>> GetAllFoldersAsync();
        Task CreateFolderAsync(Folder folder, int userId);
        Task<bool> UpdateFolderAsync(Folder updatedFolder);
        Task<bool> DeleteFolderAsync(int id);
        //  Task<Folder> GetFolderByIdAsync(int id, int userId); // שליפת תיקיה לפי ID של תיקיה ו-ID של משתמש
        Task<IEnumerable<Folder>> GetFoldersByUserIdAsync(int userId);

    }
}


