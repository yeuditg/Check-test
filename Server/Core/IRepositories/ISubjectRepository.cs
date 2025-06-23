using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.IRepositories
{
    public interface ISubjectRepository
    {
        Task<IEnumerable<Subject>> GetAllSubjects();
        Task<Subject> GetSubjectById(int id);
        Task AddSubject(Subject newSubject);
        Task UpdateSubject(Subject updatedSubject);
        Task DeleteSubject(int id);
        Task AddClassToSubject(int subjectId, Classes newClass);
        Task<IEnumerable<Subject>> GetSubjectsByUserId(int userId);
        Task<IEnumerable<Classes>> GetClassesBySubjectId(int subjectId);
        Task DeleteClassesBySubjectId(int subjectId);

    }
}
