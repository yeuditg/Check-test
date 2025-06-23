//using Core.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Core.IServices
//{
//    public interface IFileService
//    {
//        Task<IEnumerable<Core.Models.File>> GetAllFilesAsync();
//        Task<Core.Models.File> GetFileByIdAsync(int id);
//        Task<Core.Models.File> CreateFileAsync(Core.Models.File newFile);
//        Task<bool> UpdateFileAsync(Core.Models.File updatedFile);
//        Task<bool> DeleteFileAsync(int id);

//    }
//}
using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.IServices
{
    public interface IFileService
    {
        Task<List<Core.Models.File>> GetAllFilesAsync();
        Task<Core.Models.File> GetFileByIdAsync(int id);
        Task<Core.Models.File> CreateFileAsync(Core.Models.File newFile);
        Task<bool> UpdateFileAsync(Core.Models.File updatedFile);
        Task<bool> DeleteFileAsync(int id);
        Task<IEnumerable<Core.Models.File>> GetFilesByUserIdAsync(int userId);

    }
}
