using Core.IRepositories;
using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public class SubjectService : ISubjectService
{
    private readonly ISubjectRepository _subjectRepository;

    public SubjectService(ISubjectRepository subjectRepository)
    {
        _subjectRepository = subjectRepository;
    }

    public async Task<IEnumerable<Subject>> GetAllSubjects()
    {
        return await _subjectRepository.GetAllSubjects();
    }

    public async Task AddSubject(Subject newSubject)
    {
        await _subjectRepository.AddSubject(newSubject);
    }

    public async Task AddClassToSubject(int subjectId, Classes newClass)
    {
        await _subjectRepository.AddClassToSubject(subjectId, newClass);
    }

    public async Task UpdateSubject(Subject updatedSubject)
    {
        await _subjectRepository.UpdateSubject(updatedSubject);
    }

    public async Task DeleteSubject(int id)
    {
        await _subjectRepository.DeleteClassesBySubjectId(id);
        await _subjectRepository.DeleteSubject(id);
    }


    public async Task<IEnumerable<Subject>> GetSubjectsByUserId(int userId)
    {
        return await _subjectRepository.GetSubjectsByUserId(userId);
    }

    public async Task<Subject> GetSubjectById(int id) // הוספת המתודה
    {
        return await _subjectRepository.GetSubjectById(id);
    }
    public async Task<IEnumerable<Classes>> GetClassesBySubjectId(int subjectId)
    {
        // Call the repository method to get classes by subject ID
        return await _subjectRepository.GetClassesBySubjectId(subjectId);
    }

}
