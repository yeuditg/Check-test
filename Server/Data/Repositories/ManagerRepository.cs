using Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class ManagerRepository : IRepositoryManager
    {
        DataContext _context;
        public IAuthRepository AuthRepository { get;set; }
        public IFolderRepository FolderRepository { get; set; }
        public IFileRepository FileRepository { get; set; }
        public IUserRepository UserRepository { get; set; }

        public ManagerRepository(DataContext context, IAuthRepository authRepository,
            IFolderRepository folderRepository, IFileRepository fileRepository, IUserRepository userRepository)
        {
            _context = context;
            AuthRepository = authRepository;
            FolderRepository = folderRepository;
            FileRepository = fileRepository;
            UserRepository = userRepository;
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
