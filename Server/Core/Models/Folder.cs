using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Folder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int userId { get; set; }
        public string Description { get; set; }
        public ICollection<Folder>? Classes { get; set; } = new List<Folder>();
        //in class is it null
        public ICollection<File>? test { get; set; } = new List<File>();
        //שיעור יהדות Null כיתה רשימה של הציונים

    }
}
