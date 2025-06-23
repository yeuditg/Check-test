namespace Api.PostModel
{
    public class GptRequest
    {
        //public string Model { get; set; } = "gpt-3.5-turbo";
        //public string Prompt { get; set; }
        //public int MaxTokens { get; set; } = 100;
        //public double Temperature { get; set; } = 0.7;
        public string Prompt { get; set; }
        public string Question { get; set; }
    }
   
}