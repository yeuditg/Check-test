using Core.IRepositories;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Data.Repositories
{
    public class StudentsTestFeedbackRepository : IStudentsTestFeedbackRepository
    {
        private readonly DataContext _context;

        public StudentsTestFeedbackRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<StudentTestFeedback> GetAll()
        {
            return _context.StudentsTestFeedbacks.ToList();
        }

        public StudentTestFeedback GetById(int id)
        {
            return _context.StudentsTestFeedbacks.Find(id);
        }

        public void Add(StudentTestFeedback feedback)
        {
            _context.StudentsTestFeedbacks.Add(feedback);
            _context.SaveChanges();
            }
    }
}

