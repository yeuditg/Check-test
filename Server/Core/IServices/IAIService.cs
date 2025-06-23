using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.IServices
{
    public interface IAIService
    {
        Task<string> AskOpenAIWithFile(string fileId, string question, string apiKey);
        Task<string> UploadFileToOpenAI(string filePath, string apiKey);
    }
}
