using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IRepositories
{
        public interface IClassRepository
        {
            Task<IEnumerable<Classes>> GetAllClasses();
            Task<Classes> GetClassById(int id);
            Task AddClass(Classes newClass);
            Task UpdateClass(Classes updatedClass);
            Task DeleteClass(int id);
            Task AddClassToSubject(int subjectId, Classes newClass);
        }

}
