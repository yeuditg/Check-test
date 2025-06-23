using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using System.Net.Http;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Configuration;
using Core.IServices;

namespace Service
{
    public class OcrService : IOcrService
    {

        private readonly HttpClient _httpClient;
        private readonly string _googleApiKey;



        public OcrService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClient = httpClientFactory.CreateClient();
            _googleApiKey = configuration["Ocr:GoogleApiKey"];

        }

        public async Task<JsonDocument> ExtractTextAsync(string base64Image)
        {
            var googleApiUrl = $"https://vision.googleapis.com/v1/images:annotate?key={_googleApiKey}";

            var googleRequest = new
            {
                requests = new[]
                {
                    new
                    {
                        image = new { content = base64Image },
                       features = new[]
                        {
                            //new { type = "TEXT_DETECTION" },
                            new { type = "DOCUMENT_TEXT_DETECTION" }
                        }
                       //imageContext = new { languageHints = new[] { "he" } }
                    }
                }
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(googleRequest), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(googleApiUrl, jsonContent);
            var responseString = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"OCR request failed: {response.StatusCode} - {responseString}");
            }

            return JsonDocument.Parse(responseString);
        }
    }
}
