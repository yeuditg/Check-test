using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IRepositories
{
    public interface IRepositoryManager
    {
        public IAuthRepository AuthRepository { get; set; }
        public IFolderRepository FolderRepository { get; set; }
        public IFileRepository FileRepository { get; set; }
        public IUserRepository UserRepository { get; set; }

        Task SaveChanges();
    }
}
