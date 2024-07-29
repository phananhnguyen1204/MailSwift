namespace API.Entities
{
    public class Document
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }


        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

    }
}