using Api.PostModel;
using AutoMapper;
using Core.IServices;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Org.BouncyCastle.Crypto.Generators;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ChatController : ControllerBase
{
    private readonly HttpClient client = new HttpClient();
    private readonly IConfiguration _configuration;
    public ChatController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] GptRequest gptRequest)
    {
        string myApiKey = _configuration["OpenAI:ApiKey"];
        try
        {
            var prompt = new
            {
                model = "gpt-4o",
                messages = new[] {
                    new { role = "system", content = gptRequest.Prompt },
                    new { role = "user", content = gptRequest.Question }
                    }
            };
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
            {
                Content = JsonContent.Create(prompt)
            };
            request.Headers.Add("Authorization", $"Bearer {myApiKey}");
            // ����� ����� �-API
            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseContent);
                throw new Exception($": {response.StatusCode}. �����: {responseContent}");
            }

            var responseContent1 = await response.Content.ReadAsStringAsync();
            return Ok(responseContent1); // ����� ����� ������
        }
        catch (HttpRequestException httpEx)
        {
            Console.WriteLine($"����� ������ �-API: {httpEx.Message}");
            return StatusCode(500, "���� ������ �-API.");
        }
        catch (System.Text.Json.JsonException jsonEx)
        {
            Console.WriteLine($"����� ������ ������ �-API: {jsonEx.Message}");
            return StatusCode(500, "����� ������ ������ �-API.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"����� �����: {ex.Message}");
            return StatusCode(500, "����� ����� ����� ������.");
        }
    }

}
