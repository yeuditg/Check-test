using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IRepositories
{
    public interface IStudentsTestFeedbackRepository
    {
        IEnumerable<StudentTestFeedback> GetAll();
        StudentTestFeedback GetById(int id);
        void Add(StudentTestFeedback feedback);
    }
}
