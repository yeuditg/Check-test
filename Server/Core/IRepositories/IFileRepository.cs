using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IRepositories;

public interface IFileRepository
{
    Task<Core.Models.File> GetFileByIdAsync(int id);
    Task<IEnumerable<Core.Models.File>> GetAllFilesAsync();
    Task<Core.Models.File> CreateFileAsync(Core.Models.File newfile);
    Task<bool> UpdateFileAsync(Core.Models.File updatedfile);
    Task<bool> DeleteFileAsync(int id);
    Task<IEnumerable<Core.Models.File>> GetFilesByUserIdAsync(int userId);

}
