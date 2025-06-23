////using Core.IRepositories;
////using Core.Models;
////using Microsoft.EntityFrameworkCore;
////using System;
////using System.Collections.Generic;
////using System.Linq;
////using System.Text;
////using System.Threading.Tasks;

////namespace Data.Repositories
////{
////    public class SubjectRepository : ISubjectRepository
////    {
////        private readonly DataContext _context;

////        public SubjectRepository(DataContext context)
////        {
////            _context = context;
////        }

////        public async Task<IEnumerable<Subject>> GetAllSubjects()
////        {
////            return await _context.Subjects.ToListAsync();
////        }

////        public async Task<Subject> GetSubjectById(int id)
////        {
////            return await _context.Subjects.FirstOrDefaultAsync(s => s.Id == id);
////        }

////        public async Task AddSubject(Subject newSubject)
////        {
////            await _context.Subjects.AddAsync(newSubject);
////            await _context.SaveChangesAsync();
////        }

////        public async Task UpdateSubject(Subject updatedSubject)
////        {
////            _context.Subjects.Update(updatedSubject);
////            await _context.SaveChangesAsync();
////        }

////        public async Task DeleteSubject(int id)
////        {
////            var subjectToDelete = await _context.Subjects.FindAsync(id);
////            if (subjectToDelete != null)
////            {
////                _context.Subjects.Remove(subjectToDelete);
////                await _context.SaveChangesAsync();
////            }
////            else
////            {
////                throw new Exception("Subject not found");
////            }
////        }

////        public async Task AddClassToSubject(int subjectId, Classes newClass)
////        {
////            var subject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == subjectId);

////            if (subject == null)
////            {
////                throw new Exception("Subject not found");
////            }

////            newClass.SubjectId = subjectId;

////            await _context.Classes.AddAsync(newClass);
////            await _context.SaveChangesAsync();
////        }

////    }
////}
//using Core.IRepositories;
//using Core.Models;
//using Data;
//using Microsoft.EntityFrameworkCore;
//public class SubjectRepository : ISubjectRepository
//{
//    private readonly DataContext _context;

//    public SubjectRepository(DataContext context)
//    {
//        _context = context;
//    }

//    public async Task<IEnumerable<Subject>> GetAllSubjects()
//    {
//        return await _context.Subjects.ToListAsync();
//    }

//    public async Task<Subject> GetSubjectById(int id)
//    {
//        return await _context.Subjects.FirstOrDefaultAsync(s => s.Id == id);
//    }

//    public async Task AddSubject(Subject newSubject)
//    {
//        await _context.Subjects.AddAsync(newSubject);
//        await _context.SaveChangesAsync();
//    }

//    public async Task UpdateSubject(Subject updatedSubject)
//    {
//        _context.Subjects.Update(updatedSubject);
//        await _context.SaveChangesAsync();
//    }

//    public async Task DeleteSubject(int id)
//    {
//        var subjectToDelete = await _context.Subjects.FindAsync(id);
//        if (subjectToDelete != null)
//        {
//            _context.Subjects.Remove(subjectToDelete);
//            await _context.SaveChangesAsync();
//        }
//        else
//        {
//            throw new Exception("Subject not found");
//        }
//    }

//    public async Task AddClassToSubject(int subjectId, Classes newClass)
//    {
//        var subject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == subjectId);

//        if (subject == null)
//        {
//            throw new Exception("Subject not found");
//        }

//        newClass.SubjectId = subjectId;

//        await _context.Classes.AddAsync(newClass);
//        await _context.SaveChangesAsync();
//    }
//}
using Core.IRepositories;
using Core.Models;
using Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly DataContext _context;

        public SubjectRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Subject>> GetAllSubjects()
        {
            return await _context.Subjects.ToListAsync();
        }

        public async Task AddSubject(Subject newSubject)
        {
            await _context.Subjects.AddAsync(newSubject);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSubject(Subject updatedSubject)
        {
            _context.Subjects.Update(updatedSubject);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSubject(int id)
        {
            var subjectToDelete = await _context.Subjects.FindAsync(id);
            if (subjectToDelete != null)
            {
                _context.Subjects.Remove(subjectToDelete);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Subject not found");
            }
        }

        public async Task AddClassToSubject(int subjectId, Classes newClass)
        {
            var subject = await _context.Subjects.FirstOrDefaultAsync(s => s.Id == subjectId);
            if (subject == null)
            {
                throw new Exception("Subject not found");
            }

            newClass.SubjectId = subjectId;
            await _context.Classes.AddAsync(newClass);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Subject>> GetSubjectsByUserId(int userId)
        {
            return await _context.Subjects.Where(s => s.userId == userId).ToListAsync();
        }
        public async Task<Subject> GetSubjectById(int id)
        {
            return await _context.Subjects.FirstOrDefaultAsync(s => s.Id == id);
        }
        public async Task<IEnumerable<Classes>> GetClassesBySubjectId(int subjectId)
        {
            return await _context.Classes.Where(c => c.SubjectId == subjectId).ToListAsync(); 
        }
        public async Task DeleteClassesBySubjectId(int subjectId)
        {
            var classes = await _context.Classes.Where(c => c.SubjectId == subjectId).ToListAsync();
            _context.Classes.RemoveRange(classes);
            await _context.SaveChangesAsync();
        }

    }
}



