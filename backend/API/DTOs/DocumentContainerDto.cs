using System.Collections.Generic;
namespace API.DTOs
{
    public class DocumentContainerDto
    {
         public int Id { get; set; }

        public string UserId { get; set; }

        public List<DocumentDto> UserDocuments { get; set; }
    }
}