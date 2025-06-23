using Microsoft.AspNetCore.Mvc;
using Core.IServices;
using Core.Models;
using System.Net;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamAnalysisController : ControllerBase
    {
        private readonly ITestAnalysisService _testAnalysisService;

        public ExamAnalysisController(ITestAnalysisService testAnalysisService)
        {
            _testAnalysisService = testAnalysisService;
        }

        [HttpPost("analyze-class")]
        public async Task<IActionResult> AnalyzeClass([FromBody] List<string> fileNames)
        {
            if (fileNames == null || fileNames.Count < 2)
                return BadRequest("יש לשלוח רשימת קבצים עם לפחות מבחן פתור אחד ומבחן תלמיד אחד.");

            try
            {
                var result = await _testAnalysisService.AnalyzeClassAnswersAsync(fileNames);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new
                {
                    message = "אירעה שגיאה בניתוח המבחנים",
                    error = ex.Message
                });
            }
        }
    }
}