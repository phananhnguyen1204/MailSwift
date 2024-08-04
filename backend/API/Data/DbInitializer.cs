using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context) {
            if (context.Documents.Any()) return;

            var documentContainers = new List<DocumentContainer>
{
    new DocumentContainer { Id = 1, UserId = "user_1" },
    new DocumentContainer { Id = 2, UserId = "user_2" }
    // Add more containers if needed
};

foreach (var container in documentContainers)
{
    context.DocumentContainer.Add(container);
}
context.SaveChanges();

var documents = new List<Document> 
{
    new Document
    {
        UserId = "user_1",
        Title = "Untitled Document",
        Description = "Lorem ipsum...",
        CreatedAt = new DateTime(2008, 3, 15),
        UpdatedAt = new DateTime(2008, 3, 15),
        DocumentContainerId = 1 // Must match with existing DocumentContainer Id
    },
    new Document
    {
        UserId = "user_2",
        Title = "Another Document",
        Description = "Lorem ipsum...",
        CreatedAt = new DateTime(2008, 3, 15),
        UpdatedAt = new DateTime(2008, 3, 15),
        DocumentContainerId = 2 // Must match with existing DocumentContainer Id
    }
    // Add more documents if needed
};

foreach (var document in documents)
{
    context.Documents.Add(document);
}
context.SaveChanges();
        }
    }
}