using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailResponseAPI : ControllerBase
    {
        private readonly OpenAIClient _openAIClient;
        private readonly string _deploymentId;

        public EmailResponseAPI()
        {
            string endpoint = "endpoint";
            string apiKey = "key";
            _deploymentId = "MailMaster";

            _openAIClient = new OpenAIClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
        }

        [HttpPost("generate-email")]
        public async Task<IActionResult> GenerateEmail([FromBody] EmailRequest request)
        {
            try
            {
                // Construct a custom prompt with the full email data
                string customPrompt = $"You are a helpful email assistant. Based on the following information, generate an appropriate email response:\n" +
                                    $"\nSubject: {request.Subject}" +
                                    $"\nSender: {request.Sender}" +
                                    $"\nReceived at: {request.Timestamp}" +
                                    $"\n\nEmail Body:\n{request.Body}";

                var chatOptions = new ChatCompletionsOptions
                {
                    Messages =
                    {
                        new ChatMessage(ChatRole.System, "You are a helpful email assistant."),
                        new ChatMessage(ChatRole.User, customPrompt)
                    },
                    MaxTokens = 400,
                    Temperature = 0.7f,
                };

                Response<ChatCompletions> response = await _openAIClient.GetChatCompletionsAsync(_deploymentId, chatOptions);

                string generatedEmail = response.Value.Choices[0].Message.Content;

                return Ok(new { Email = generatedEmail });
            }
            catch (RequestFailedException ex)
            {
                return StatusCode(ex.Status, $"Error generating email: {ex.Message}");
            }
        }
    }

    public class EmailRequest
    {
        public string Subject { get; set; }
        public string Sender { get; set; }
        public string Body { get; set; }
        public string Timestamp { get; set; }
    }

}
