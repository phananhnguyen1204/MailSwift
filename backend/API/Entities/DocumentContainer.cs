using System.Collections.Generic;

namespace API.Entities
{
    public class DocumentContainer
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public List<Document> UserDocuments { get; set; } = new();

        public void AddDocument(Document doc){
            UserDocuments.Add(doc);
        }

        public void RemoveDocument(Document doc){
            if (doc == null) return;
            UserDocuments.Remove(doc);
        }
    }
}