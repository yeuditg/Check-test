using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IServices
{
    public interface IOpenAiService
    {
        Task<StudentTestFeedback> EvaluateAnswerAsync(string studentText, string solvedText);
    }
 


}
