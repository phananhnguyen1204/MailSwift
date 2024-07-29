using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context) {
            if (context.Documents.Any()) return;

            var documents = new List<Document> {
                new Document
                {
                    UserId = 3,
                    Title = "Untitled Document",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    CreatedAt = new DateTime(2008, 3, 15),
                    UpdatedAt = new DateTime(2008, 3, 15),
                },
                new Document
                {
                    UserId = 4,
                    Title = "Untitled Document",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    CreatedAt= new DateTime(2008, 3, 15),
                    UpdatedAt= new DateTime(2008, 3, 15),
                },
                new Document
                {
                    UserId = 5,
                    Title = "Untitled Document",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    CreatedAt= new DateTime(2008, 3, 15),
                    UpdatedAt= new DateTime(2008, 3, 15)
                },
                new Document
                {
                    UserId = 6,
                    Title = "Untitled Document",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    CreatedAt= new DateTime(2008, 3, 15),
                    UpdatedAt= new DateTime(2008, 3, 15)
                },
            };

            foreach( var document in documents) {
                context.Documents.Add(document);
            }

            context.SaveChanges();
        }
    }
}