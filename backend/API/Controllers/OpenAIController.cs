using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpenAIController : ControllerBase
    {
        private readonly OpenAIClient _openAIClient;
        private readonly string _deploymentId;

        public OpenAIController()
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
                var chatOptions = new ChatCompletionsOptions
                {
                    Messages =
                    {
                        new ChatMessage(ChatRole.System, "You are a a helpful email assistant that help people generate email based on their given description."),
                        new ChatMessage(ChatRole.User, request.Description)
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
        public string Description { get; set; }
    }
}
