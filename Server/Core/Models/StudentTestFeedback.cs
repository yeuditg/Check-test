using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class StudentTestFeedback
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public int FinalGrade { get; set; }
        public List<QuestionFeedback> Feedback { get; set; }
        public string NoteToTeacher { get; set; }
    }

    public class QuestionFeedback
    {
        public int Id { get; set; }
        public int QuestionNumber { get; set; }
        public int PercentForQuestion { get; set; }
        public string Status { get; set; }
        public string Feedback { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
