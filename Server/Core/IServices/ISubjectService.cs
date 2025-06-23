using Core.Models;

public interface ISubjectService
{
    Task<IEnumerable<Subject>> GetAllSubjects();
    Task AddSubject(Subject newSubject);
    Task UpdateSubject(Subject updatedSubject);
    Task DeleteSubject(int id);
    Task AddClassToSubject(int subjectId, Classes newClass);
    Task<IEnumerable<Subject>> GetSubjectsByUserId(int userId);
    Task<Subject> GetSubjectById(int id);
    Task<IEnumerable<Classes>> GetClassesBySubjectId(int subjectId);

}
