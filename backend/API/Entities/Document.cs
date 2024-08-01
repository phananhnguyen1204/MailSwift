using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Document
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }


        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

         public int DocumentContainerId { get; set; }  // Foreign key to DocumentContainer
        
        [ForeignKey("DocumentContainerId")]
        [JsonIgnore]  
        public DocumentContainer DocumentContainer { get; set; }
    }

}