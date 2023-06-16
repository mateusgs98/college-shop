using Microsoft.EntityFrameworkCore;
using Infrastructure.Persistence.Entities;

namespace Infrastructure.Persistence
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }
        
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Produto> Produtos { get; set; }
    }
}