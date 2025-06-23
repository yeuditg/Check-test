using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Core.IServices;
using Core.Models;
using Microsoft.Extensions.Configuration;

public class OpenAiService : IOpenAiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public OpenAiService(IConfiguration configuration, IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
        _apiKey = configuration["OpenAI:ApiKey"] ?? throw new Exception("Missing OpenAI key");
    }

    public async Task<StudentTestFeedback?> EvaluateAnswerAsync(string studentText, string teacherText)
    {
        var prompt = $@"
Hi! I'm a teacher, and I’d like your help checking one of my students’ tests.

I have two PDF files (base64-encoded):
1. The official solved test that I (the teacher) created.
2. A scanned test submitted by my student.

Your job:
You must compare the student's answers **ONLY** to the teacher's official solutions.
- Even if the teacher's solution is clearly incorrect — you must **treat it as correct**.
- Do not rely on any external knowledge.
- Do not try to fix or validate the teacher's answer.
- The student should **not** be penalized for following the teacher’s solution, even if it’s wrong.

If you notice a possible mistake in the teacher's solution, mention it politely in the `noteToTeacher` section — but it should **not** affect the student's grade.

Grading:
- If a question has a weight (e.g., Question 1 [20%]), use it.
- If no weights are given, assume equal score for all questions.

Scoring rules for each question:
- Status 'תשובה מצוינת' → full score for that question
- Status 'נכונה חלקית' → half the score
- Status 'שגויה' → 0 score

The `finalGrade` should be calculated as the sum of all question scores and must be a number between 0 to 100.

Each question must include a `percentForQuestion` field, which indicates how much it counts toward the final grade (between 0–100). The sum of all `percentForQuestion` values must equal 100.

Please return a **strict JSON** like this:

{{
  ""studentName"": ""Name as appears on the student's test"",
  ""finalGrade"": number from 0 to 100,
  ""feedback"": [
    {{
      ""questionNumber"": 1,
      ""percentForQuestion"": number from 0 to 100,
      ""status"": ""תשובה מצוינת"" | ""נכונה חלקית"" | ""שגויה"",
      ""feedback"": ""short and focused comment"",
      ""correctAnswer"": ""short explanation of the correct answer, if needed""
    }}
  ],
  ""noteToTeacher"": ""A polite note about test clarity or mistakes in the original teacher solution, if any.""
}}

Important:
❗❗ Return **only** a valid JSON.
❌ Do NOT include any text before or after the JSON.
❌ Do NOT use Markdown (```), comments (//), or explanations.
✅ Only the JSON object starting with '{{' and ending with '}}'.

Here are the PDFs:

Teacher test : {teacherText}

Student test : {studentText}
";


        var requestBody = new
        {
            model = "gpt-4",
            messages = new[] {
                new { role = "user", content = prompt }
            },
            temperature = 0.2
        };

        var json = JsonSerializer.Serialize(requestBody);
        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        {
            Headers = { Authorization = new AuthenticationHeaderValue("Bearer", _apiKey) },
            Content = new StringContent(json, Encoding.UTF8, "application/json")
        };

        var response = await _httpClient.SendAsync(request);
        Console.WriteLine(response);
        response.EnsureSuccessStatusCode();

        var resultJson = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(resultJson);
        var content = doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

        Console.WriteLine("GPT Response:");
        Console.WriteLine(content);

        // חיתוך תוכן ה-JSON בין הסוגריים המסולסלים הראשונים והאחרונים בלבד
        var firstBraceIndex = content.IndexOf('{');
        var lastBraceIndex = content.LastIndexOf('}');
        if (firstBraceIndex >= 0 && lastBraceIndex > firstBraceIndex)
        {
            content = content.Substring(firstBraceIndex, lastBraceIndex - firstBraceIndex + 1);
        }

        try
        {
            var feedbackResult = JsonSerializer.Deserialize<StudentTestFeedback>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (feedbackResult == null)
                throw new Exception("Deserialized object is null");

            foreach (var q in feedbackResult.Feedback)
            {
                Console.WriteLine($"\tQuestion {q.QuestionNumber}: {q.Status}");
                Console.WriteLine($"\t\tFeedback: {q.Feedback}");
                Console.WriteLine($"\t\tCorrect Answer: {q.CorrectAnswer}");
            }
            return feedbackResult;
        }
        catch (JsonException ex)
        {
            Console.WriteLine("Failed to deserialize GPT response to StudentTestFeedback:");
            Console.WriteLine(ex.Message);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Unexpected error:");
            Console.WriteLine(ex.Message);
        }
        return null;
    }
}

