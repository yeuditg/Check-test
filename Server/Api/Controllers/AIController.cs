using Microsoft.AspNetCore.Mvc;
using Core.IServices;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using System.Net.Http.Headers;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    //private readonly IAIService _aiService;
    //private readonly IConfiguration _configuration;

    //public AIController(IAIService aiService,IConfiguration configuration)
    //{
    //    _aiService = aiService;
    //    _configuration = configuration;
    //}
    //[HttpPost("upload-and-ask")]
    //public async Task<IActionResult> UploadAndAsk([FromForm] UploadAndAskRequest request)
    //{
    //    string apiKey = _configuration["OpenAI:ApiKey"];
    //    Console.WriteLine(apiKey + "controller");

    //    var extension = Path.GetExtension(request.File.FileName).ToLowerInvariant();
    //    var allowedExtensions = new[]
    //    {
    //    ".c", ".cpp", ".css", ".csv", ".doc", ".docx", ".gif", ".go", ".html", ".java", ".jpeg", ".jpg", ".js",
    //    ".json", ".md", ".pdf", ".php", ".pkl", ".png", ".pptx", ".py", ".rb", ".tar", ".tex", ".ts", ".txt",
    //    ".webp", ".xlsx", ".xml", ".zip"
    //    };

    //    if (!allowedExtensions.Contains(extension))
    //    {
    //        return BadRequest($"סיומת הקובץ אינה נתמכת: {extension}");
    //    }

    //    var tempFileName = Path.GetRandomFileName() + extension;
    //    var tempPath = Path.Combine(Path.GetTempPath(), tempFileName);

    //    using (var stream = System.IO.File.Create(tempPath))
    //    {
    //        await request.File.CopyToAsync(stream);
    //    }

    //    try
    //    {
    //        var fileId = await _aiService.UploadFileToOpenAI(tempPath, apiKey);
    //        var answer = await _aiService.AskOpenAIWithFile(fileId, request.Question, apiKey);
    //        return Ok(answer);
    //    }
    //    finally
    //    {
    //        System.IO.File.Delete(tempPath);
    //    }
    //}


    //public class UploadAndAskRequest
    //{
    //    public IFormFile File { get; set; }
    //    public string Question { get; set; }
    //}
    private readonly IConfiguration _configuration;

    public AIController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("ask")]
    public async Task<IActionResult> AskAssistant([FromForm] AskRequest request)
    {
        var apiKey = _configuration["OpenAI:ApiKey"];
        var assistantId = _configuration["OpenAI:AssistantId"];
        var vectorStoreId = _configuration["OpenAI:VectorStoreId"];

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        client.DefaultRequestHeaders.Add("OpenAI-Beta", "assistants=v2");

        // 1. שמירת הקובץ זמנית
        var tempPath = Path.GetTempFileName();
        using (var stream = System.IO.File.Create(tempPath))
            await request.File.CopyToAsync(stream);

        // 2. העלאה ל־OpenAI
        var fileContent = new StreamContent(System.IO.File.OpenRead(tempPath));
        fileContent.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        using var formData = new MultipartFormDataContent
    {
        { fileContent, "file", request.File.FileName },
        { new StringContent("assistants"), "purpose" }
    };
        var uploadResponse = await client.PostAsync("https://api.openai.com/v1/files", formData);
        var uploadJson = JsonDocument.Parse(await uploadResponse.Content.ReadAsStringAsync());
        var fileId = uploadJson.RootElement.GetProperty("id").GetString();

        // 3. הוספה ל־Vector Store

        var addFile = new { file_id = fileId };
        var addFileRes = await client.PostAsJsonAsync($"https://api.openai.com/v1/vector_stores/{vectorStoreId}/files", addFile);
        var addFileContent = await addFileRes.Content.ReadAsStringAsync();
        Console.WriteLine("Vector Store Add File Response: " + addFileContent);

        // המתנה לסיום אינדוקס של הקובץ ב-Vector Store
        while (true)
        {
            await Task.Delay(1000);
            var checkStatus = await client.GetAsync($"https://api.openai.com/v1/vector_stores/{vectorStoreId}/files/{fileId}");
            var checkJson = JsonDocument.Parse(await checkStatus.Content.ReadAsStringAsync());
            var fileStatus = checkJson.RootElement.GetProperty("status").GetString();
            Console.WriteLine("Vector Store File Status: " + fileStatus);

            if (fileStatus == "completed") break;
            if (fileStatus == "failed")
                return BadRequest("אינדוקס הקובץ נכשל.");
        }

        // 4. יצירת thread
        var threadRes = await client.PostAsJsonAsync("https://api.openai.com/v1/threads", new { });
        var threadJson = JsonDocument.Parse(await threadRes.Content.ReadAsStringAsync());
        var threadId = threadJson.RootElement.GetProperty("id").GetString();

        // 5. יצירת הודעה עם השאלה
        var message = new
        {
            role = "user",
            content = request.Question
        };
        await client.PostAsJsonAsync($"https://api.openai.com/v1/threads/{threadId}/messages", message);

        // 6. הפעלת ריצה עם vector store
        var runData = new
        {
            assistant_id = assistantId
        };
        var runRes = await client.PostAsJsonAsync($"https://api.openai.com/v1/threads/{threadId}/runs", runData);
        if (!runRes.IsSuccessStatusCode)
        {
            var errorContent = await runRes.Content.ReadAsStringAsync();
            Console.WriteLine("Run API Error: " + errorContent);

            return BadRequest("יצירת הריצה נכשלה: " + errorContent);
        }
        var runJson = JsonDocument.Parse(await runRes.Content.ReadAsStringAsync());
        var runId = runJson.RootElement.GetProperty("id").GetString();

        // 7. המתנה לסיום
        while (true)
        {
            await Task.Delay(1000);
            var statusRes = await client.GetAsync($"https://api.openai.com/v1/threads/{threadId}/runs/{runId}");
            Console.WriteLine(statusRes);
            var statusContent = await statusRes.Content.ReadAsStringAsync();
            Console.WriteLine("Run Status Response JSON: " + statusContent);

            var statusJson = JsonDocument.Parse(await statusRes.Content.ReadAsStringAsync());
            var status = statusJson.RootElement.GetProperty("status").GetString();
            if (status == "completed") break;
            if (status == "failed" || status == "cancelled")
                return BadRequest("הבקשה נכשלה.");
        }

        // 8. שליפת תשובה
        var messagesRes = await client.GetAsync($"https://api.openai.com/v1/threads/{threadId}/messages");
        var messagesJson = JsonDocument.Parse(await messagesRes.Content.ReadAsStringAsync());
        Console.WriteLine("Messages JSON: " + messagesJson.RootElement.ToString());

        var messages = messagesJson.RootElement.GetProperty("data").EnumerateArray().ToList();
        if (messages.Count == 0)
            return BadRequest("לא נמצאה תשובה מהאסיסטנט.");
        var messagesContent = await messagesRes.Content.ReadAsStringAsync();
        Console.WriteLine("Thread Messages JSON: " + messagesContent);
    

        var messageContent = messages[0].GetProperty("content").EnumerateArray().FirstOrDefault();
        if (!messageContent.TryGetProperty("text", out var textObj))
            return BadRequest("פורמט התשובה אינו צפוי.");

        var answer = textObj.GetProperty("value").GetString();

        //var answer = messagesJson.RootElement
        //    .GetProperty("data")[0]
        //    .GetProperty("content")[0]
        //    .GetProperty("text")
        //    .GetProperty("value")
        //    .GetString();

        try
        {
            System.IO.File.Delete(tempPath);
        }
        catch (IOException ex)
        {
            Console.WriteLine("לא הצלחתי למחוק את הקובץ: " + ex.Message);
        }

        return Ok(answer);
    }

    public class AskRequest
    {
        public IFormFile File { get; set; }
        public string Question { get; set; }
    }
}

