using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.IRepositories
{
    public interface IFolderRepository
    {
        Task<IEnumerable<Folder>> GetAllFoldersAsync();
        Task CreateFolderAsync(Folder folder);
        Task<bool> UpdateFolderAsync(Folder updatedFolder);
        Task<bool> DeleteFolderAsync(int id);
        Task<IEnumerable<Folder>> GetByUserIdAsync(int userId);

    }
}
