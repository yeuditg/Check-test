//using Core.IRepositories;
//using Core.IServices;
//using Core.Models;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Service
//{
//    public class ClassService : IClassService
//    {
//        private readonly IClassRepository _classRepository;

//        public ClassService(IClassRepository classRepository)
//        {
//            _classRepository = classRepository;
//        }

//        public async Task<IEnumerable<Classes>> GetAllClasses()
//        {
//            return await _classRepository.GetAllClasses();
//        }

//        public async Task<Classes> GetClassById(int id)
//        {
//            return await _classRepository.GetClassById(id);
//        }

//        public async Task AddClass(Classes newClass)
//        {
//            await _classRepository.AddClass(newClass);
//        }

//        public async Task UpdateClass(Classes updatedClass)
//        {
//            await _classRepository.UpdateClass(updatedClass);
//        }

//        public async Task DeleteClass(int id)
//        {
//            await _classRepository.DeleteClass(id);
//        }
//        public async Task AddClassToSubject(int subjectId, Classes newClass)
//        {
//            await _classRepository.AddClassToSubject(subjectId, newClass);
//        }
//    }

//}
using Core.IRepositories;
using Core.IServices;
using Core.Models;

public class ClassService : IClassService
{
    private readonly IClassRepository _classRepository;

    public ClassService(IClassRepository classRepository)
    {
        _classRepository = classRepository;
    }

    public async Task<IEnumerable<Classes>> GetAllClasses()
    {
        return await _classRepository.GetAllClasses();
    }

    public async Task<Classes> GetClassById(int id)
    {
        return await _classRepository.GetClassById(id);
    }

    public async Task AddClass(Classes newClass)
    {
        await _classRepository.AddClass(newClass);
    }

    public async Task UpdateClass(Classes updatedClass)
    {
        await _classRepository.UpdateClass(updatedClass);
    }

    public async Task DeleteClass(int id)
    {
        await _classRepository.DeleteClass(id);
    }

    public async Task AddClassToSubject(int subjectId, Classes newClass)
    {
        await _classRepository.AddClassToSubject(subjectId, newClass);
    }
}
