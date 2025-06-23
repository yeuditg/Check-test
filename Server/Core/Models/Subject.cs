using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int userId { get; set; }
        //  public string TeacherEmail { get; set; }
        //  public List<Classes> Classes { get; set; } 
    }

}
