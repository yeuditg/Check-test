//using Core.IServices;
//using Core.Models;
//using System.Text.Json;

//public class TestAnalysisService : ITestAnalysisService
//{
//    private readonly IDownloadService _downloadService;
//    private readonly IOcrService _ocrService;
//    private readonly IOpenAiService _openAiService;
//    private readonly HttpClient _httpClient;

//    public TestAnalysisService(
//        IDownloadService downloadService,
//        IOcrService ocrService,
//        IOpenAiService openAiService,
//        IHttpClientFactory httpClientFactory)
//    {
//        _downloadService = downloadService;
//        _ocrService = ocrService;
//        _openAiService = openAiService;
//        _httpClient = httpClientFactory.CreateClient();
//    }

//    public async Task<Dictionary<string, StudentTestFeedback>> AnalyzeClassAnswersAsync(IEnumerable<string> fileNames)
//    {
//        var results = new Dictionary<string, StudentTestFeedback>();
//        var fileList = fileNames.ToList();

//        if (fileList.Count < 2)
//            throw new ArgumentException("יש צורך לפחות במבחן פתור אחד ומבחן תלמיד אחד.");

//        var solvedBase64 = Convert.ToBase64String(await _httpClient.GetByteArrayAsync(await _downloadService.GetDownloadUrlAsync(fileList[0])));
//        var solvedOcr = await _ocrService.ExtractTextAsync(solvedBase64);

//        var solvedText = solvedOcr.RootElement
//            .GetProperty("responses")[0]
//            .GetProperty("fullTextAnnotation")
//            .GetProperty("text")
//            .GetString();

//        for (int i = 1; i < fileList.Count; i++)
//        {
//            var studentFile = fileList[i];
//            try
//            {
//                var studentBase64 = Convert.ToBase64String(await _httpClient.GetByteArrayAsync(await _downloadService.GetDownloadUrlAsync(studentFile)));
//                var studentOcr = await _ocrService.ExtractTextAsync(studentBase64);

//                var studentText = studentOcr.RootElement
//                    .GetProperty("responses")[0]
//                    .GetProperty("fullTextAnnotation")
//                    .GetProperty("text")
//                    .GetString();

//                var feedback = await _openAiService.EvaluateAnswerAsync(studentText, solvedText);
//                results[studentFile] = feedback;
//            }
//            catch (Exception ex)
//            {
//                results[studentFile] = new StudentTestFeedback { StudentName = studentFile, Feedback = new(), FinalGrade = 0 };
//            }
//        }

//        return results;
//    }
//}

using Core.IRepositories;
using Core.IServices;
using Core.Models;
using System.Text.Json;

public class TestAnalysisService : ITestAnalysisService
{
    private readonly IDownloadService _downloadService;
    private readonly IOcrService _ocrService;
    private readonly IOpenAiService _openAiService;
    private readonly IStudentsTestFeedbackRepository _feedbackRepository; // הוספת ממשק עבור ה-Repositiry
    private readonly HttpClient _httpClient;

    public TestAnalysisService(
        IDownloadService downloadService,
        IOcrService ocrService,
        IOpenAiService openAiService,
        IStudentsTestFeedbackRepository feedbackRepository, // הוספת פרמטר עבור ה-Repositiry
        IHttpClientFactory httpClientFactory)
    {
        _downloadService = downloadService;
        _ocrService = ocrService;
        _openAiService = openAiService;
        _feedbackRepository = feedbackRepository; // אתחול ה-Repositiry
        _httpClient = httpClientFactory.CreateClient();
    }

    public async Task<List<StudentTestFeedback>> AnalyzeClassAnswersAsync(IEnumerable<string> fileNames)
    {
        var results =new  List<StudentTestFeedback>();
        var fileList = fileNames.ToList();

        if (fileList.Count < 2)
            throw new ArgumentException("יש צורך לפחות במבחן פתור אחד ומבחן תלמיד אחד.");

        var solvedBase64 = Convert.ToBase64String(await _httpClient.GetByteArrayAsync(await _downloadService.GetDownloadUrlAsync(fileList[0])));
        var solvedOcr = await _ocrService.ExtractTextAsync(solvedBase64);

        var solvedText = solvedOcr.RootElement
            .GetProperty("responses")[0]
            .GetProperty("fullTextAnnotation")
            .GetProperty("text")
            .GetString();

        for (int i = 1; i < fileList.Count; i++)
        {
            var studentFile = fileList[i];
            try
            {
                var studentBase64 = Convert.ToBase64String(await _httpClient.GetByteArrayAsync(await _downloadService.GetDownloadUrlAsync(studentFile)));
                var studentOcr = await _ocrService.ExtractTextAsync(studentBase64);

                var studentText = studentOcr.RootElement
                    .GetProperty("responses")[0]
                    .GetProperty("fullTextAnnotation")
                    .GetProperty("text")
                    .GetString();

                var feedback = await _openAiService.EvaluateAnswerAsync(studentText, solvedText);

                if (feedback != null)
                {
                    feedback.StudentName = studentFile;
                    _feedbackRepository.Add(feedback);
                    results.Add(feedback);
                }

            }
            catch (Exception ex)
            {
                results.Add(new StudentTestFeedback
                {
                    StudentName = studentFile,
                    Feedback = new List<QuestionFeedback>(), 
                    FinalGrade = 0
                });
            }
        }

        return results;
    }
}

