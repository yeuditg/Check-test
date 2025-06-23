using Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{

    public class File
    {
        public int Id { get; set; }
        public int? FeedbackId { get; set; } 
        public int UserId { get; set; }
        public int SubjectId { get; set; }
        public int ClassId { get; set; }
        public string FileName { get; set; }      // The name of the file
        public string FilePath { get; set; }      // The path where the file is located
        public long FileSize { get; set; }      // The size of the file in bytes
      
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; } // The date the file was created

        public string Content { get; set; }

        public bool IsChecked { get; set; } = false;
        public DateTime? CheckedOn { get; set; }

        public StudentTestFeedback? Feedback { get; set; } 
        //public DateTime ModifiedDate { get; set; } // The date the file was last modified
    }
}
