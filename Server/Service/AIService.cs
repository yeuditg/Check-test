using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using Core.IRepositories;
using Core.IServices;
using Microsoft.Extensions.Configuration;
namespace Service
{

    public class AIService : IAIService
    {
        private readonly IRepositoryManager _managerRepository;
        private readonly IConfiguration _configuration;

        public AIService(IRepositoryManager managerRepository, IConfiguration configuration)
        {
            _managerRepository = managerRepository;
            _configuration = configuration;
        }
        public async Task<string> AskOpenAIWithFile(string fileId, string question, string apiKey)
        {


            using var client = new HttpClient();

            var body = new
            {
                model = "gpt-4o",
                messages = new[]
                {
            new { role = "user", content = question }
        },
                file_ids = new[] { fileId }
            };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
            {
                Content = JsonContent.Create(body)
            };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await client.SendAsync(request);
            var responseString = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"שגיאה בתשובת GPT: {response.StatusCode} - {responseString}");
            }

            return responseString;
        }
        public async Task<string> UploadFileToOpenAI(string filePath, string apiKey)
        {
            Console.WriteLine("apiKey"+apiKey+"apiKey");
            using var client = new HttpClient();

            using var multipartContent = new MultipartFormDataContent();
            multipartContent.Add(new StreamContent(File.OpenRead(filePath)), "file", Path.GetFileName(filePath));
            multipartContent.Add(new StringContent("assistants"), "purpose");

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/files")
            {
                Content = multipartContent
            };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await client.SendAsync(request);
            var responseString = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"שגיאה בהעלאת הקובץ: {response.StatusCode} - {responseString}");
            }

            // הפענוח של ה-file_id מתוך התשובה
            var json = System.Text.Json.JsonDocument.Parse(responseString);
            var fileId = json.RootElement.GetProperty("id").GetString();

            return fileId!;
        }
    }
}
