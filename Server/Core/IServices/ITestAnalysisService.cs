using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IServices
{
    public interface ITestAnalysisService
    {
        Task<List<StudentTestFeedback>> AnalyzeClassAnswersAsync(IEnumerable<string> fileNames);
    }
}

