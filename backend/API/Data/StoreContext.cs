using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Document> Documents { get; set; }
        public DbSet<DocumentContainer> DocumentContainer { get; set; }
    }
}