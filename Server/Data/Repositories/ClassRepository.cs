//using Core.IRepositories;
//using Core.Models;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Data.Repositories
//{
//    public class ClassRepository : IClassRepository
//    {
//        private readonly DataContext _context;

//        public ClassRepository(DataContext context)
//        {
//            _context = context;
//        }

//        public async Task<IEnumerable<Classes>> GetAllClasses()
//        {
//            return await _context.Classes.ToListAsync();
//        }

//        public async Task<Classes> GetClassById(int id)
//        {
//            return await _context.Classes.FindAsync(id);
//        }

//        public async Task AddClass(Classes newClass)
//        {
//            await _context.Classes.AddAsync(newClass);
//            await _context.SaveChangesAsync();
//        }

//        public async Task UpdateClass(Classes updatedClass)
//        {
//            _context.Classes.Update(updatedClass);
//            await _context.SaveChangesAsync();
//        }

//        public async Task DeleteClass(int id)
//        {
//            var classToDelete = await _context.Classes.FindAsync(id);
//            if (classToDelete != null)
//            {
//                _context.Classes.Remove(classToDelete);
//                await _context.SaveChangesAsync();
//            }
//        }
//        public async Task AddClassToSubject(int subjectId, Classes newClass)
//        {
//            var subject = await _context.Subjects.FindAsync(subjectId);
//            if (subject == null)
//            {
//                throw new Exception("Subject not found");
//            }
//            newClass.SubjectId = subjectId;
//            await _context.Classes.AddAsync(newClass);
//            await _context.SaveChangesAsync();
//        }
//    }
//}
using Core.IRepositories;
using Core.Models;
using Data;
using Microsoft.EntityFrameworkCore;

public class ClassRepository : IClassRepository
{
    private readonly DataContext _context;

    public ClassRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Classes>> GetAllClasses()
    {
        return await _context.Classes.ToListAsync();
    }

    public async Task<Classes> GetClassById(int id)
    {
        return await _context.Classes.FindAsync(id);
    }

    public async Task AddClass(Classes newClass)
    {
        await _context.Classes.AddAsync(newClass);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateClass(Classes updatedClass)
    {
        _context.Classes.Update(updatedClass);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteClass(int id)
    {
        var classToDelete = await _context.Classes.FindAsync(id);
        if (classToDelete != null)
        {
            _context.Classes.Remove(classToDelete);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AddClassToSubject(int subjectId, Classes newClass)
    {
        var subject = await _context.Subjects.FindAsync(subjectId);
        if (subject == null)
        {
            throw new Exception("Subject not found");
        }
        newClass.SubjectId = subjectId;
        await _context.Classes.AddAsync(newClass);
        await _context.SaveChangesAsync();
    }
}
